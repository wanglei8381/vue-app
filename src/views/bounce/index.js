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
        },
        setBounce: function () {
            console.log('---->');
        }
    }
};