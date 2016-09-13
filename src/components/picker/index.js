require('./style.styl');

let Touch = require('../../util/touch');
module.exports = {
    template: require('./template.html'),
    data(){
        return {
            open: false,
            fade: false,
            curIdx: 0
        };
    },
    props: ['list', 'picker'],
    computed: {
        maxVal(){
            return (this.list.length - 1) * 20;
        }
    },
    watch: {
        list(){
            this.$nextTick(()=> {
            });
        }
    },
    methods: {
        choose(item, idx, event){
            this.close();
            this.$dispatch('accept-action-sheet', idx, item.value, item.label);
        },
        close(){
            this.fade = false;
            setTimeout(()=> {
                this.open = false;
            }, 300);
        }

    },
    ready(){

        //切换
        var touch = new Touch(this.$el);
        touch.start();
        this.touch = touch;
        this.$container = this.$el.querySelector('.m-picker-list');
        this.$list = this.$container.querySelectorAll('li');
        touch.on('touch:start', (e)=> {
        });

        let distinct = 0;
        let speed = 0.5;
        touch.on('touch:move', (rep)=> {
            rep.e.preventDefault();
            distinct += rep.yrange * speed;

            if (distinct > this.maxVal + 20) {
                distinct = this.maxVal + 20;
            }
            if (distinct < -20) {
                distinct = -20;
            }

            let base = parseInt(distinct / 20);
            let min = 20 * base;
            let max = min + 20;
            let interval = max;
            if (distinct - min <= max - distinct) {
                interval = min;
            }

            if (distinct >= 0 && distinct <= this.maxVal) {
                //选中的下表
                let idx = interval / 20;
                this.$list[this.curIdx].classList.remove('highlight');
                this.$list[idx].classList.add('highlight');
                this.curIdx = idx;
            }

            this.$container.style.transform = 'rotateX(' + distinct + 'deg)';
        });

        touch.on('touch:end', (rep)=> {
            if (distinct > this.maxVal) {
                distinct = this.maxVal;
            }
            if (distinct < 0) {
                distinct = 0;
            }
            let base = parseInt(distinct / 20);
            let min = 20 * base;
            let max = min + 20;
            if (distinct - min <= max - distinct) {
                distinct = min;
            } else {
                distinct = max;
            }
            this.$container.style.transform = 'rotateX(' + distinct + 'deg)';
            this.$container.style.webkitTransition = '100ms ease-out';
        });

        this.$el.addEventListener("webkitTransitionEnd", ()=> {
            this.$container.style.webkitTransition = null;
        });

    }
};