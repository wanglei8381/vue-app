require('./style.css');


var list = [
    {
        title: '(pull up down)下拉刷新和上拉加载',
        link: '/pullupdown'
    },
    {
        title: 'dialog(消息框)',
        link: '/dialog'
    }
];

module.exports = {
    template: require('./template.html'),
    data: function () {
        return {list: list};
    },
    methods: {
        goto: function (link) {
            console.log(link);
            this.$router.go(link);
        }
    }
};