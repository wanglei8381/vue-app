require('./style.styl');
module.exports = {
    template: require('./template.html'),
    data(){
        return {open: false, fade: false};
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
    }
};