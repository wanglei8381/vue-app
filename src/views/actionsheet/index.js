require('./style.css');

module.exports = {
    template: require('./template.html'),
    data() {
        return {
            msg: '选择...',
            open: false,
            picker: null,
            list: [
                {label: '拍照', value: 'paizhao'},
                {label: '图库中选择', value: 'tuku'},
                {label: '云盘', value: 'yunpan'}
            ]
        };
    },
    watch: {
        'picker': function (picker) {
            this.msg = '[' + picker.value + '][' + picker.label + ']';
        }
    },
    methods: {
        choose: function () {
            this.open = true;
        }
    },
    events: {
        'left-nav'(e){
            this.$router.go('/');
        }
    }
};