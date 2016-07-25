require('./style.css');

module.exports = {
    template: require('./template.html'),
    data: function () {
        return {
            msg: '选择...',
            list: [
                {label: '拍照', value: 'paizhao'},
                {label: '图库中选择', value: 'tuku'},
                {label: '云盘', value: 'yunpan'}
            ]
        };
    },
    methods: {
        choose: function () {
            this.$broadcast('choose-action-sheet');
        }
    },
    events: {
        'accept-action-sheet': function (idx, value, label) {
            this.msg = '[' + idx + '][' + value + '][' + label + ']';
        },
        'left-nav'(e){
            this.$router.go('/');
        }
    }
};