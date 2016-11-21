(function () {

    var wuage = window.wuage || (window.wuage = {});

    var toast = null;

    /**
     * 打开toast
     * @param message 提示信息
     * @param duration 持续时间,默认1500
     * @param position 位置:top,center,bottom,默认center
     */
    wuage.openToast = function (message, duration, position) {
        if (toast) return;
        duration = duration || 1500;
        toast = document.createElement('div');
        toast.classList.add('toast-container');
        position && toast.classList.add(position);
        toast.innerHTML = '<div class="toast-wrapper"><div class="toast-message">' + message + '</div></div>';
        toast.addEventListener('webkitTransitionEnd', function () {
            if (toast && !toast.classList.contains('active')) {
                toast.parentNode.removeChild(toast);
                toast = null;
            }
        });
        document.body.appendChild(toast);
        //这条语句不是多余,为添加动画作缓冲
        toast.offsetHeight;
        toast.classList.add('active');
        setTimeout(function () {
            toast && toast.classList.remove('active');
        }, duration);
    }

    wuage.closeToast = function () {
        if (toast) {
            toast.parentNode.removeChild(toast);
            toast = null;
        }
    }

})();