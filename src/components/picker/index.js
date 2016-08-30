require('./style.styl');

let touch = require('../../util/touch');
module.exports = {
    template: require('./template.html'),
    data(){
        return {open: false, fade: false, curIdx: 0};
    },
    props: ['list'],
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
    events: {
        'choose-action-sheet'(list){
            if (list) {
                this.list = list;
            }
            this.open = true;
            setTimeout(()=> {
                this.fade = true;
            }, 1);
        }
    },
    ready(){
        //切换
        touch.trigger('el', this.$el);
        
    }
};