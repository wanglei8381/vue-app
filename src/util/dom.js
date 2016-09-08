/**
 * 标题 dom操作
 * 描述
 * 创建日期 16/9/7 下午1:44
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */


var stack = {};
var i = 1;
exports.add = function (el, event, cb, useCapture) {
    el._uid = el._uid || i++;
    var obj = stack[el._uid] = stack[el._uid] ? stack[el._uid] : {};
    var arr = obj[event] = obj[event] ? obj[event] : [];
    arr.push(cb);
    el.addEventListener(event, cb, !!useCapture);
};

exports.remove = function (el, event, cb) {
    if (cb) {
        el.removeEventListener(event, cb);
    } else if (el._uid && stack[el._uid]) {
        var obj = stack[el._uid];
        var keys = [];
        if (event) {
            if (obj[event]) {
                keys.push(event);
            }
        } else {
            keys = Object.keys(obj);
        }

        keys.forEach(function (key) {
            obj[key].forEach(function (_cb) {
                el.removeEventListener(event, _cb);
            });
            delete obj[key];
        });

    }
};