var Event = require('../../../src/util/event')

var e = {
    __proto__: new Event(e),
    name: 'test'
}

// describe('Util - event', function () {
//     it('event on', function () {
//         e.on('start', function () {
//
//         });
//     })
// })

e.on('start', function (msg) {
    console.log(this.name + ' start', msg);
}, e);

e.on('start', function (msg) {
    console.log(this.name + ' start2', msg);
});

var obj = {name: 'title'};
e.on('start', function (msg) {
    console.log(this.name + ' start2', msg);
}, obj);

e.pause('start');
e.trigger('start', 'HELLO');
e.resume('start');
e.trigger('start', 'WORLD');
