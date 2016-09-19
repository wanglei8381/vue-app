require('./style.styl');

let Touch = require('../../util/touch');
module.exports = {
    template: require('./template.html'),
    data(){
        return {
            curIdx: 0,
            distinct: 0,
            speed: 0.5
        }
    },
    props: ['list', 'picker'],
    computed: {
        maxVal(){
            return (this.list.length - 1) * 20;
        }
    },
    methods: {
        move(res){
            let distinct = this.distinct;
            distinct += res.yrange * this.speed;
            this.internalCal(distinct);
        },
        end(){
            let distinct = this.distinct;
            this.internalCal(distinct, true);
            this.$container.style.webkitTransition = '100ms ease-out';
            this.picker = this.list[this.curIdx];
        },
        internalCal(distinct, isEnd){
            let baseNum = isEnd ? -0 : 20;
            if (distinct > this.maxVal + baseNum) {
                distinct = this.maxVal + baseNum;
            }
            if (distinct < -baseNum) {
                distinct = -baseNum;
            }

            let base = parseInt(distinct / 20);
            let min = 20 * base;
            let max = min + 20;
            let interval = max;
            if (distinct - min <= max - distinct) {
                interval = min;
            }
            distinct = isEnd ? interval : distinct;
            if (distinct >= 0 && distinct <= this.maxVal) {
                //选中的下表
                let idx = interval / 20;
                this.$list[this.curIdx].classList.remove('highlight');
                this.$list[idx].classList.add('highlight');
                this.curIdx = idx;
            }

            this.$container.style.transform = 'rotateX(' + distinct + 'deg)';
            this.distinct = distinct;
            this.showCal();
        },
        showCal(){
            if (this.list.length <= 15) return;
            let min = this.curIdx - 5;
            let max = this.curIdx + 5;
            for (let i = 0, len = this.list.length; i < len; i++) {
                this.$list[i].style.visibility = (i >= min && i <= max ? 'visible' : 'hidden');
            }
        }
    },
    ready(){

        //切换
        var touch = new Touch(this.$el);
        touch.start();
        this.touch = touch;
        this.$container = this.$el.querySelector('.m-picker-list');
        this.$list = this.$container.querySelectorAll('li');
        this.$list[0].classList.add('highlight');
        this.showCal();
        touch.on('touch:start', (res)=> {
            res.e.preventDefault();
        });

        touch.on('touch:move', (res)=> {
            res.e.preventDefault();
            this.move(res);
        });

        touch.on('touch:end', (res)=> {
            res.e.preventDefault();
            this.end(res);
        });

        this.$container.addEventListener("webkitTransitionEnd", ()=> {
            this.$container.style.webkitTransition = null;
        });

    }
};