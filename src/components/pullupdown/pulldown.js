let Event = require('../../util/event');

let pulldown = {
    __proto__: new Event(pulldown),
    start(){
        window.addEventListener('scroll', ()=> {
            if (document.documentElement.clientHeight + document.body.scrollTop === document.documentElement.scrollHeight) {
                this.trigger('bottom');
            }
        }, false);
    }
}

module.exports = pulldown;