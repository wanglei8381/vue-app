require('./style.css');

module.exports = {
    template: require('./template.html'),
    data(){
        return {left: 1, right: 0, leftNavbarCnt: '<i class="iconfont">&#xe601;</i>', rightNavbarCnt: ''};
    },
    watch: {
        left(val){
            switch (parseInt(val)) {
                case 0:
                    this.leftNavbarCnt = '';
                    break;
                case 1:
                    this.leftNavbarCnt = '<i class="iconfont">&#xe601;</i>';
                    break;
                case 2:
                    this.leftNavbarCnt = '<i class="iconfont">&#xe601;</i>导航';
                    break;
            }
        },
        right(val){
            switch (parseInt(val)) {
                case 0:
                    this.rightNavbarCnt = '';
                    break;
                case 1:
                    this.rightNavbarCnt = '<i class="iconfont">&#xe607;</i>';
                    break;
                case 2:
                    this.rightNavbarCnt = '编辑';
                    break;
            }
        }
    },
    events: {
        'left-nav'(e){
            this.$router.go('/');
        },
        'right-nav'(e){
            console.log(e.target);
        }
    }
};