require('../../components/style/style.styl');
require('./style.css');

module.exports = {
    template: require('./template.html'),
    data: function () {
        return {};
    },
    methods: {
        toast(){
            wuage.openToast('这是一个toast');
        },
        alert(){
            wuage.openModel({
                content: "这是一个alert",
                showCancel: false
            });
        },
        confirm(){
            wuage.openModel({
                content: "这是一个confirm"
            });
        }
    }
};