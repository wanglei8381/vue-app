let Vue = require('vue');
let Touch = require('../util/touch');

let noop = function () {
};
Vue.directive('ele-bounce', {
    acceptStatement: true,
    bind: function () {
        let speed = 0.5, distinct = 0;
        this.cbHandler = noop;
        let touch = new Touch(this.el);
        this.touch = touch;
        touch.start();

        touch.on('touch:move', (res)=> {
            console.log(distinct);
            res.e.preventDefault();
            distinct -= res.yrange * speed;
            this.el.style.transform = 'translateY(' + distinct + 'px)';
            // distinct -= res.xrange * speed;
            // this.el.style.transform = 'translateX(' + distinct + 'px)';
        });

        touch.on('touch:end', (res)=> {
            distinct = 0;
            this.el.style.transform = 'none';
            this.el.style.webkitTransition = '100ms ease-out';
            this.cbHandler.call(this.vm);
        });

        this.el.addEventListener("webkitTransitionEnd", ()=> {
            this.el.style.webkitTransition = null;
        });
    },
    update: function (handler) {
        this.cbHandler = typeof handler === 'function' ? handler : noop;
    },
    unbind: function () {
        this.touch.off('touch:move touch:end');
    }
});


