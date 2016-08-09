let touch = require('../../util/touch');
let _top = false;//到达顶部
let pullup = {
    __proto__: touch,
    start(){
        if (document.body.scrollTop === 0) {
            _top = true;
        }
        this.on('touchMove', (x1, y1, x2, y2, e) => {
            this.handleMove(x1, y1, x2, y2, e);
        });
        this.on('touchEnd', function (x1, y1, x2, y2) {
            this.handleEnd(x1, y1, x2, y2);
        });
        this.on('scroll', function () {
            _top = false;
            if (document.body.scrollTop === 0) {
                _top = true;
            }
        });

    },
    handleMove(x1, y1, x2, y2, e){
        if (_top) {
            let deltaY = y2 - y1;
            if (deltaY < 0) return;
            e.preventDefault();
            let distinct = deltaY / 5;
            this.trigger('move', distinct);
        }
    },
    handleEnd(x1, y1, x2, y2){
        var distinct = y2 - y1;
        this.trigger('end', distinct / 5);
    }
}

module.exports = pullup;