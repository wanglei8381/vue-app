require('./style.css');


module.exports = {
    template: require('./template.html'),
    data: function () {
        return {
            list: [
                {label: '北京', value: 1},
                {label: '天津', value: 2},
                {label: '上海', value: 3},
                {label: '广州', value: 4},
                {label: '深圳', value: 5},
                {label: '河北', value: 6},
                {label: '河南', value: 7},
                {label: '山东', value: 8},
                {label: '江苏', value: 9}
            ],
            item: null
        };
    },
    watch: {
        item(val){
            console.log(JSON.stringify(val));
        }
    },
    methods: {
        goto: function (link) {
            this.$router.go(link);
        }
    }
};