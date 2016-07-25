require('./style.css');

module.exports = {
    template: require('./template.html'),
    data: function () {
        return {idx: 20};
    },
    methods: {
        ajax: function () {
            if (this.idx <= 30) {
                this.idx += 10;
            }
        }
    },
    events: {
        'pull-to-refresh': function (t) {
            if (t == 1) {//下拉刷新
                setTimeout(() => {
                    this.$broadcast('pull-to-refresh-close', 1);
                }, 3000);
            } else if (t == 2) {//上拉加载
                setTimeout(() => {
                    this.$broadcast('pull-to-refresh-close', 2);
                    this.ajax();
                }, 3000);
            }
        },
        'left-nav'(e){
            this.$router.go('/');
        },
    }
};