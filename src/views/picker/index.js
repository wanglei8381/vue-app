require('./style.css');

module.exports = {
    template: require('./template.html'),
    data: function () {
        return {
            message: '',
            open: false
        };
    },
    methods: {
        choose: function () {
            this.open = true;
        },
        cancle(){
            console.log('--->cancle');
        },
        confirm(province, city, area){
            console.log('--->confirm');
            this.message = province.name + '/' + city.name + '/' + area.name;
        }
    },
    events: {
        'left-nav'(e){
            this.$router.go('/');
        },
    }
};