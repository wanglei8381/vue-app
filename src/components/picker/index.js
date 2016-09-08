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
    props: ['list'],
    computed: {
        maxVal(){
            return (this.list.length - 1) * 20
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
        this.$list = this.$el.querySelector('.m-picker-list');
        touch.on('touch:start', (e)=> {

        });

        let distinct = 0;
        touch.on('touch:move', (x1, y1, x2, y2, e)=> {
            e.preventDefault();
            let deltaY = y1 - y2;
            distinct += deltaY / 50;
            if (distinct > this.maxVal) {
                distinct = this.maxVal;
            }
            if (distinct < 0) {
                distinct = 0;
            }
            this.$list.style.transform = 'rotateX(' + distinct + 'deg)';
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
            this.$list.style.transform = 'rotateX(' + distinct + 'deg)';
            this.$list.style.webkitTransition = '100ms ease-out';
        });

        this.$el.addEventListener("transitionend", ()=> {
            this.$list.style.webkitTransition = null;
        }, true);
        this.$el.addEventListener("transitionend", ()=> {
            this.$list.style.webkitTransition = null;
        }, true);

    }
};