require('./style.css');

var areas = require('./areas');
module.exports = {
    template: require('./template.html'),
    data: function () {
        return {
            provinceList: [],
            cityList: [],
            areaList: [],
            province: {},
            city: {},
            area: {},
            provinceIdx: 0,
            cityIdx: 0,
            areaIdx: 0,
            message: '',
            open: false
        };
    },
    watch: {
        item(val){
            console.log(JSON.stringify(val));
        },
        provinceIdx(idx){
            this.cityList = areas[1][idx];
            this.areaList = areas[2][idx][0];
            this.city = this.cityList[0];
            this.area = this.areaList[0];
        },
        cityIdx(idx){
            this.areaList = areas[2][idx][0];
            this.area = this.areaList[0];
        }
    },
    methods: {
        goto: function (link) {
            this.$router.go(link);
        },
        choose: function () {
            this.open = true;
        },
        cancle: function () {
            this.open = false;
        },
        confirm: function () {
            this.open = false;
            this.message = this.province.name + '/' + this.city.name + '/' + this.area.name;
        }
    },
    ready(){
        this.provinceList = areas[0];
        this.cityList = areas[1][0];
        this.areaList = areas[2][0][0];
        this.province = this.provinceList[0];
        this.city = this.cityList[0];
        this.area = this.areaList[0];
        window.addEventListener('click', ()=> {
            this.open = false;
        });
    }
};