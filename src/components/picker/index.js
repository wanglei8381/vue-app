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
        },
        move(){

        },
        end(){

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
        touch.on('touch:move', (x1, y1, x2, y2, e, toUp, toLeft)=> {
            console.log(toUp);
            e.preventDefault();
            let deltaY = y1 - y2;
            if (toUp) {
                distinct += deltaY / 30;
            } else {
                distinct -= deltaY / 30;
            }
            if (distinct > this.maxVal) {
                distinct = this.maxVal;
            }
            if (distinct < 0) {
                distinct = 0;
            }

            let base = parseInt(distinct / 20);
            let min = 20 * base;
            let max = min + 20;
            let interval = max;
            if (distinct - min <= max - distinct) {
                interval = min;
            }
            //选中的下表
            let idx = interval / 20;
            this.$list[this.curIdx].classList.remove('highlight');
            this.$list[idx].classList.add('highlight');
            this.curIdx = idx;

            this.$container.style.transform = 'rotateX(' + distinct + 'deg)';
        });

        touch.on('touch:end', ()=> {
            if (distinct > this.maxVal) {
                distinct = this.maxVal;
            }
            let base = parseInt(distinct / 20);
            let min = 20 * base;
            let max = min + 20;
            if (distinct - min <= max - distinct) {
                distinct = min;
            } else {
                distinct = max;
            }
            //选中的下表
            // let idx = distinct / 20;
            // this.picker = this.list[idx];
            // this.$list[this.curIdx].classList.remove('highlight');
            // this.$list[idx].classList.add('highlight');
            // this.curIdx = idx;
            this.$container.style.transform = 'rotateX(' + distinct + 'deg)';
            this.$container.style.webkitTransition = '100ms ease-out';
        });

        // this.$el.addEventListener("transitionend", ()=> {
        //     this.$container.style.webkitTransition = null;
        // }, true);
        this.$el.addEventListener("webkitTransitionEnd", ()=> {
            this.$container.style.webkitTransition = null;
        }, true);

    }
};