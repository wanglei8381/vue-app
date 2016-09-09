//触摸事件处理
var Event = require('./event');
var domUtil = require('./dom');

function Touch(el) {
    this.el = el || document;
    this.touch = null;
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
    var touch = e.touches[0];
    var toUp = this.y2 > touch.pageY;
    var toLeft = this.x2 > touch.pageX;
    this.touch = touch;
    this.x2 = touch.pageX;
    this.y2 = touch.pageY;

    this.trigger('touch:move', this.x1, this.y1, this.x2, this.y2, e, toUp, toLeft);
};

Touch.prototype.touchEnd = function () {
    this.trigger('touch:end', this.x1, this.y1, this.x2, this.y2);
};

Touch.prototype.touchCancel = function () {
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