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
                {label: '江苏', value: 9},
                {label: '江苏2', value: 10},
                {label: '江苏3', value: 11},
                {label: '江苏4', value: 12},
                {label: '江苏5', value: 13},
                {label: '江苏6', value: 14},
                {label: '江苏7', value: 15},
                {label: '江苏8', value: 16},
                {label: '江苏9', value: 17},
                {label: '江苏10', value: 18},
                {label: '江苏11', value: 19},
                {label: '江苏12', value: 20},
                {label: '江苏13', value: 21}
            ],
            item: {label: '北京', value: 1}
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