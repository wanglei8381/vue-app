var Vue = require('vue');

Vue.directive('btn', {
    acceptStatement: true,
    bind: function () {
    },
    update: function (handler) {
        if (typeof handler !== 'function') {
            process.env.NODE_ENV !== 'production' && warn(
                'v-btn:' + this.arg + '="' +
                this.expression + '" expects a function value, ' +
                'got ' + handler,
                this.vm
            )
            return false;
        }
        var self = this;
        var _cls = '';
        var el = this.el;

        el.addEventListener('touchstart', function (e) {
            //e.preventDefault();
            var cls = self.el.getAttribute('class');
            _cls = cls;
            cls = cls ? cls + ' btn-animation' : 'btn-animation';
            self.el.setAttribute('class', cls);
        }, false);

        el.addEventListener('touchend', function (e) {
            self.el.setAttribute('class', _cls);
            handler.call(self.vm);
        }, false);

    },
    unbind: function () {
    }
});