require('./style.css');
let up_template = require('./up.html');
let down_template = require('./down.html');
let pullUpDown = require('./pullupdown.js');

module.exports = {
    template: require('./template.html'),
    data: ()=>({    
        config: {//canvas配置
            color: '#ff0000',
            lineWidth: 3,
            canvasHeight: 50,
            canvasWidth: 50
        },
        cxt: null,//canvas上下文
        loadingOpen: false,//上拉加载是否显示
        loadingMsg: '加载中...',//上拉加载显示的内容
        style: {//内联样式
            rotateWrapper: {},
            rotateCanvas: {}
        },
        doms: {//dom节点

        },
        isWaiting: false,//下拉刷新等待状态
        isClose: false,//下拉刷新关闭状态
        count: 0//动画执行的次数
    }),
    props: ['up', 'down'],
    methods: {
        goto: function (link) {
            this.$router.go(link);
        },
        drawArrowCircle: function (i) {
            if (i > 1.8) {
                return;
            }
            const cxt = this.cxt;
            cxt.globalAlpha = i / 2;
            //清除画布
            cxt.clearRect(0, 0, 50, 50);
            //画圆
            cxt.beginPath();
            cxt.arc(25, 25, 15, 0, i * Math.PI, false);
            cxt.stroke();
            //画箭头
            let x1 = 25 + 15 * Math.cos((i + 0.2) * Math.PI);
            let y1 = 25 + 15 * Math.sin((i + 0.2) * Math.PI);
            let x2 = 25 + 10 * Math.cos((i - 0.1) * Math.PI);
            let y2 = 25 + 10 * Math.sin((i - 0.1) * Math.PI);
            let x3 = 25 + 20 * Math.cos((i) * Math.PI);
            let y3 = 25 + 20 * Math.sin((i) * Math.PI);
            cxt.beginPath();
            cxt.moveTo(x1, y1);
            cxt.lineTo(x2, y2);
            cxt.lineTo(x3, y3);
            cxt.closePath();
            cxt.fill();
        },
        drawCircle: function () {
            let j = 0;
            let k = 0;
            let a = 1;
            const cxt = this.cxt;
            const self = this;
            return function __drawCircle() {
                cxt.clearRect(0, 0, 50, 50);
                cxt.beginPath();
                cxt.arc(25, 25, 15, k * Math.PI, j * Math.PI, false);
                cxt.stroke();
                if (a % 2) {
                    j = j + 0.06;
                    k = k + 0.03;
                } else {
                    j = j + 0.03;
                    k = k + 0.06;
                }
                if (Math.abs(j - k) >= 2) {
                    a++;
                    k = j %= 2;
                }
                self.count = window.requestAnimationFrame(__drawCircle);
            };
        },
        handleBottom: function () {
            pullUpDown.pause('bottom');
            this.loadingOpen = true;
            document.body.scrollTop = document.body.scrollTop + 100;
            this.$dispatch('pull-to-refresh', 2);
        },
        closeBottom: function () {
            this.loadingOpen = false;
            pullUpDown.resume('bottom');
        },
        handleUpMove: function (distinct) {
            if (distinct > 95) return;
            this.isWaiting = false;
            this.isClose = false;
            this.doms.rotateWrapper.style.top = distinct + 'px';
            this.doms.rotateCanvas.style.transform = 'rotate(' + distinct * 3 + 'deg)';
            this.drawArrowCircle(distinct / 30);
        },
        handleUpEnd: function (distinct) {
            this.doms.rotateWrapper.removeAttribute('style');
            if (distinct >= 50) {
                pullUpDown.pause('move').pause('end');
                //调用动画
                window.requestAnimationFrame(this.drawCircle());
                this.isWaiting = true;
                this.isClose = false;
                this.$dispatch('pull-to-refresh', 1);
            } else {
                this.isWaiting = false;
                this.isClose = true;
            }
        },
        closeUp: function () {
            this.isWaiting = false;
            this.isClose = true;
            pullUpDown.resume('move').resume('end');
            //todo测试动画能否关闭
            window.cancelAnimationFrame(this.count);
        }
    },
    events: {
        'pull-to-refresh-close': function (t) {
            if (t == 1) {
                this.closeUp();
            } else if (t == 2) {
                this.closeBottom();
            }
        }
    },
    ready: function () {
        this.doms.rotateWrapper = this.$el.querySelector('#__rotate__wrapper');
        this.doms.rotateCanvas = this.$el.querySelector('#__rotate__canvas');
        if (this.up) {
            pullUpDown.on('bottom', () => {
                this.handleBottom();
            });
        }
        if (this.down) {
            let cxt = this.doms.rotateCanvas.getContext('2d');
            cxt.strokeStyle = this.config.color;
            cxt.fillStyle = this.config.color;
            cxt.lineWidth = this.config.lineWidth;

            this.cxt = cxt;


            pullUpDown.on('move', (distinct) => {
                this.handleUpMove(distinct);
            });

            pullUpDown.on('end', (distinct) => {
                this.handleUpEnd(distinct);
            });
        }


    }
};