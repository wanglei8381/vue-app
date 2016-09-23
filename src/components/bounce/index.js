/**
 * 标题 页面上下弹动
 * 描述
 * 创建日期 16/9/23 下午4:12
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

require('./style.styl');

let Touch = require('../../util/touch');
module.exports = {
    template: require('./template.html'),
    data(){
        return {
            distinct: 0,
            speed: 0.5
        }
    },
    methods: {
        move(res){
            let distinct = this.distinct;
            console.log(distinct);
            distinct -= res.yrange * this.speed;
            document.body.style.transform = 'translateY(' + distinct + 'px)';
            this.distinct = distinct;
        },
        end(){
            this.distinct = 0;
            document.body.style.transform = 'translateY(0px)';
        }
    },
    ready(){
        document.body.style.webkitTransition = '100ms ease-out';
        var touch = new Touch(document.body);
        touch.start();
        touch.on('touch:start', (res)=> {
            // res.e.preventDefault();
        });

        touch.on('touch:move', (res)=> {
            //res.e.preventDefault();
            this.move(res);
        });

        touch.on('touch:end', (res)=> {
            // res.e.preventDefault();
            this.end(res);
        });
    }
};