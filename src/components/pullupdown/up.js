let pullUpDown = require('./pullupdown.js');

pullUpDown.on('bottom', function () {
    pullUpDown.pause('bottom');
    loading.setAttribute('class', 'u-loading open');
    console.log(document.body.scrollTop);
    document.body.scrollTop = document.body.scrollTop + 100;
    console.log(document.body.scrollTop);
    setTimeout(function () {

        if (idx > 33) {
            return loading.innerHTML = '数据加载完毕了';
        } else {
            loading.setAttribute('class', 'u-loading');
        }

        for (var i = idx; i < idx + 10; i++) {
            var n = document.createElement('li');
            n.innerHTML = i;
            list.appendChild(n);
        }
        idx = idx + 10;
        pullUpDown.resume('bottom');
    }, 3000);
});