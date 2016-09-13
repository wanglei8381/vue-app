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
    this.trigger('touch:start', e);
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
        xrange: xrange || 0,
        yrange: yrange || 0,
        spend: this.spend
    });
};

Touch.prototype.touchEnd = function () {
    this.spend = Date.now() - this.lastTimestamp;
    this.trigger('touch:end', {
        x1: this.x1,
        y1: this.y1,
        x2: this.x2,
        y2: this.y2,
        spend: this.spend
    });
};

Touch.prototype.touchCancel = function () {
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
    this.el.addEventListener('scroll', () => {
        this.touchCancel();
        this.trigger('touch:scroll');
    }, false);

    //重新绑定dom
    this.on('touch:el', (el) => {
        this._remove();
        this.el = el;
        this._add();
    });
};

module.exports = Touch;