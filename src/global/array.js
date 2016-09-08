/**
 * 标题 数组全局变量
 * 描述
 * 创建日期 16/8/15 下午3:59
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

var ArrayProto = Array.prototype;

/**
 * 在Object原型上添加属性
 * @param name 属性名
 * @param value 值
 */
var definePropertyHandler = function (name, value) {
    Object.defineProperty(ArrayProto, name, {value: value, enumerable: false});
};

Array.toArray = function (likeArr) {
    return Array.prototype.slice.call(likeArr, 0);
}

definePropertyHandler('distinct', function (key) {
    var result = [], hash = {};
    var isComplex = this[0] && key && eval('this[0].' + key);
    for (var i = 0, length = this.length; i < length; i++) {
        var elem = isComplex ? eval('this[' + i + '].' + key) : this[i];
        if (!hash[elem]) {
            result.push(this[i]);
            hash[elem] = true;
        }
    }
    return result;
});
