//触摸事件处理
var Event = require('./event');

var touch = {
    __proto__: new Event(touch),
    el: document,
    _add: function () {
        this.add(this.el, 'touchstart', this.touchStart);
        this.add(this.el, 'touchmove', this.touchMove);
        this.add(this.el, 'touchend', this.touchEnd);
        this.add(this.el, 'touchcancel', this.touchCancel);
    },
    _remove: function () {
        this.remove(this.el, 'touchstart', this.touchStart);
        this.remove(this.el, 'touchmove', this.touchMove);
        this.remove(this.el, 'touchend', this.touchEnd);
        this.remove(this.el, 'touchcancel', this.touchCancel);
    },
    init: function () {
        this.firstTouch = null;
        this.x1 = this.y1 = this.x2 = this.y2 = undefined;
    },
    reinit: function () {
        this._remove();
        this._add();
    },
    start: function () {
        var self = this;
        this._add();
        this.add(window, 'scroll', function () {
            self.trigger('scroll');
            self.touchCancel();
        });

        this.on('el', function (el) {
            self.el = el;
            self.reinit();
        });
    },
    touchStart: function (e) {
        var firstTouch = e.touches[0];
        this.firstTouch = firstTouch;
        if (e.touches && e.touches.length === 1 && this.x2) {
            this.x2 = this.y2 = undefined;
        }

        this.x1 = firstTouch.pageX;
        this.y1 = firstTouch.pageY;
        this.trigger('touchStart', e);
    },
    touchMove: function (e) {
        var firstTouch = e.touches[0];
        this.firstTouch = firstTouch;
        this.x2 = firstTouch.pageX;
        this.y2 = firstTouch.pageY;
        this.trigger('touchMove', this.x1, this.y1, this.x2, this.y2, e);

    },
    touchEnd: function () {
        this.trigger('touchEnd', this.x1, this.y1, this.x2, this.y2);
    },
    touchCancel: function () {
        this.init();
    }
};
touch.start();
module.exports = touch;