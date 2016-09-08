/**
 * 标题 滚动到指定的位置
 * 描述
 * 创建日期 16/9/7 下午1:24
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */


/**
 *
 * @param scrollTop 数值(px),默认0 滚动到指定的位置
 * @param duration 持续的时间(毫秒),默认1000
 * @param callback
 */
module.exports = function (scrollTop, duration, callback) {
    scrollTop = scrollTop || 0;
    duration = duration || 1000;
    var scroll = function (duration) {
        if (duration <= 0) {
            window.scrollTo(0, scrollTop);
            callback && callback();
            return;
        }
        var distaince = scrollTop - window.scrollY;
        setTimeout(function () {
            window.scrollTo(0, window.scrollY + distaince / duration * 10);
            scroll(duration - 10);
        }, 16.7);
    };
    scroll(duration);
}