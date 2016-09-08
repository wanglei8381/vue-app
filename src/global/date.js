/**
 * 标题 日期扩展
 * 描述
 * 创建日期 16/8/15 下午2:12
 * 作者 lei.wang@wuage.com
 * 版本 0.0.1
 */

//日期格式化函数
//默认当前时间，默认格式yyyy-MM-dd HH:mm:ss
//一般用法
// dateFormat()
// dateFormat(1459934682000,'yyyy-MM-dd')
// dateFormat('2015-12-16T08:02:51.284Z','YYYY/M/DD hh:mm')
Date.prototype.format = function (format) {
    if (format == null) {
        format = 'yyyy-MM-dd HH:mm:ss';
    }
    var add0 = function (num) {
        return num > 9 ? num : '0' + num;
    };
    return format.replace(/[yY]{4}/, this.getFullYear())
        .replace(/MM/, add0(this.getMonth() + 1))
        .replace(/M/, this.getMonth() + 1)
        .replace(/[dD]{2}/, add0(this.getDate()))
        .replace(/[dD]{1}/, this.getDate())
        .replace(/[hH]{2}/, add0(this.getHours()))
        .replace(/[hH]{1}/, this.getHours())
        .replace(/mm/, add0(this.getMinutes()))
        .replace(/m/, this.getMinutes())
        .replace(/[sS]{2}/, add0(this.getSeconds()))
        .replace(/[sS]{1}/, this.getSeconds())
}
