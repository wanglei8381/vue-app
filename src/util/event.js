/**
 * Event事件对象
 * @constructor
 */
function Event(__raw) {
    this._events = {};
    this.__raw = __raw;
}

/**
 * 绑定一个事件
 * @param name
 * @param cb
 * @param cxt
 * @returns {Event}
 */
Event.prototype.on = function (name, cb, cxt) {
    var self = this;
    name.split(/\s/).forEach(function (ename) {
        var events = self._events[ename] || {
                handle: [],
                pause: false
            };
        events.handle.push({
            cb: cb,
            cxt: cxt || self.__raw || self,
        });
        self._events[ename] = events;
    });
    return this;
};

/**
 * 卸载某个事件,全部卸载,暂时不做颗粒化
 * @param name
 * @returns {Event}
 */
Event.prototype.off = function (name) {
    if (name in this._events) {
        delete this._events[name];
    }
    return this;
};

/**
 * 暂停某个事件,全部暂停,暂时不做颗粒化
 * @param name
 * @returns {Event}
 */
Event.prototype.pause = function (name) {
    if (name in this._events) {
        this._events[name].pause = true;
    }
    return this;
};

/**
 * 恢复某个事件,全部恢复,暂时不做颗粒化
 * @param name
 * @returns {Event}
 */
Event.prototype.resume = function (name) {
    if (name in this._events) {
        this._events[name].pause = false;
    }
    return this;
};

/**
 * 触发某个事件
 * @param name
 * @returns {Event}
 */
Event.prototype.trigger = function (name) {
    var events = this._events[name];
    if (events && !events.pause) {
        var len = arguments.length;
        var args = [], i = 1;
        while (i < len) {
            args.push(arguments[i++]);
        }
        events.handle.forEach(function (handle) {
            if (typeof handle.cb === 'function') {
                handle.cb.apply(handle.cxt, args);
            }
        });
    }
    return this;
};

/**
 * 绑定dom事件
 * @param el
 * @param name
 * @param cb
 * @param useCapture
 * @returns {Event}
 */
Event.prototype.add = function (el, name, cb, useCapture) {
    //this.on(name, cb);
    var self = this;
    el.addEventListener(name, function (e) {
        cb.call(self, e);
    }, !!useCapture);
    return this;
};

/**
 * 删除dom事件
 * @param el
 * @param name
 * @param cb
 * @returns {Event}
 */
Event.prototype.remove = function (el, name, cb) {
    //this.off(name);
    var self = this;
    el.removeEventListener(name, function (e) {
        cb.call(self, e);
    }, false);
    return this;
};

module.exports = Event;