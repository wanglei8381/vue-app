require('./style.css');

module.exports = {
    template: require('./template.html'),
    data: function () {
        return {idx: 0, pauseScrollTrigger: false};
    },
    methods: {
        request(){
            this.pauseScrollTrigger = true;
            this.$scroll.innerHTML = '加载中..';
            setTimeout(()=> {
                this.pauseScrollTrigger = false;
                this.$scroll.innerHTML = '';
                this.idx += 20;
                if (this.idx >= 50) {
                    this.pauseScrollTrigger = true;
                    this.$scroll.innerHTML = '没有数据了';
                }
            }, 3000);
        }
    },
    events: {
        'pull-to-refresh': function (t) {
            setTimeout(() => {
                this.$broadcast('pull-to-refresh-close');
                this.idx = 20;
            }, 1000);
        },
        'left-nav'(e){
            this.$router.go('/');
        }
    },
    ready() {
        // this.$broadcast('pull-to-refresh-waiting');
        // setTimeout(() => {
        //     this.$broadcast('pull-to-refresh-close');
        //     this.idx = 10;
        // }, 1000);

        this.$scroll = this.$el.querySelector('.scroll-loading-wrapper');
        this.request();
    }
};