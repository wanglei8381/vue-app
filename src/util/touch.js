//触摸事件处理
var Event = require('./event');
var domUtil = require('./dom');

function Touch(el) {
    Event.call(this);
    this.el = el || document;
    this.touch = null;
    this.lastTimestamp = Date.now();
    this.spend = 0;
    this.x1 = this.y1 = this.x2 = this.y2 = undefined;
}

Touch.prototype = new Event();

Touch.prototype._add = function () {
    domUtil.add(this.el, 'touchstart', this.touchStart.bind(this), false);
    domUtil.add(this.el, 'touchmove', this.touchMove.bind(this), false);
    domUtil.add(this.el, 'touchend', this.touchEnd.bind(this), false);
    domUtil.add(this.el, 'touchcancel', this.touchCancel.bind(this), false);
};

Touch.prototype._remove = function () {
    domUtil.remove(this.el, 'touchstart');
    domUtil.remove(this.el, 'touchmove');
    domUtil.remove(this.el, 'touchend');
    domUtil.remove(this.el, 'touchcancel');
};

Touch.prototype.touchStart = function (e) {
    this.lastTimestamp = Date.now();
    var touch = e.touches[0];
    this.touch = touch;
    this.touch.el = 'tagName' in touch.target ?
        touch.target : touch.target.parentNode;
    if (e.touches && e.touches.length === 1 && this.x2) {
        this.x2 = this.y2 = undefined;
    }

    this.x1 = touch.pageX;
    this.y1 = touch.pageY;
    this.trigger('touch:start', {
        e: e,
        el: this.touch.el,
        timestamp: this.lastTimestamp
    });
};

Touch.prototype.touchMove = function (e) {
    this.spend = Date.now() - this.lastTimestamp;
    var touch = e.touches[0];
    var yrange = this.y2 - touch.pageY;
    var xrange = this.x2 - touch.pageX;
    this.x2 = touch.pageX;
    this.y2 = touch.pageY;

    this.trigger('touch:move', {
        x1: this.x1,
        y1: this.y1,
        x2: this.x2,
        y2: this.y2,
        e: e,
        toUp: yrange > 0,
        toLeft: xrange > 0,
        dir: swipeDirection(this.x1, this.x2, this.y1, this.y2),
        xrange: xrange || 0,
        yrange: yrange || 0,
        spend: this.spend
    });
};

Touch.prototype.touchEnd = function (e) {
    this.spend = Date.now() - this.lastTimestamp;
    this.trigger('touch:end', {
        x1: this.x1,
        y1: this.y1,
        x2: this.x2,
        y2: this.y2,
        dir: swipeDirection(this.x1, this.x2, this.y1, this.y2),
        e: e,
        spend: this.spend
    });
};

Touch.prototype.touchCancel = function () {
    //this.pause('touch:start touch:move touch:end');
    this.trigger('touch:cancel', {
        x1: this.x1,
        y1: this.y1,
        x2: this.x2,
        y2: this.y2,
        spend: this.spend
    });
    this.spend = 0;
    this.touch = null;
    this.x1 = this.y1 = this.x2 = this.y2 = undefined;
};

Touch.prototype.start = function () {
    this._add();

    this.el.addEventListener('scroll', (e) => {
        this.touchCancel();
        this.trigger('touch:scroll');
    }, false);

    document.addEventListener('scroll', (e) => {
        this.touchCancel();
        this.trigger('scroll');
        // if (document.documentElement.clientHeight + document.body.scrollTop === document.documentElement.scrollHeight) {
        //     this.resume('touch:start touch:move touch:end');
        // }
        // if (document.body.scrollTop === 0) {
        //     this.resume('touch:start touch:move touch:end');
        // }
    }, false);

    //重新绑定dom
    this.on('touch:el', (el) => {
        this._remove();
        this.el = el;
        this._add();
    });
};

function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
    Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down')
}

module.exports = Touch;