<<<<<<< HEAD
var events = require('events'),
    util = require('util'),
    EventRegistry,
=======
const events = require('events'),
    util = require('util');
let EventRegistry,
>>>>>>> newversion/master
    EventRegistryInstance;

EventRegistry = function () {
    events.EventEmitter.call(this);
};

util.inherits(EventRegistry, events.EventEmitter);

EventRegistry.prototype.onMany = function (arr, onEvent) {
<<<<<<< HEAD
    var self = this;

    arr.forEach(function (eventName) {
        self.on(eventName, onEvent);
=======
    arr.forEach((eventName) => {
        this.on(eventName, onEvent);
>>>>>>> newversion/master
    });
};

EventRegistryInstance = new EventRegistry();
EventRegistryInstance.setMaxListeners(100);

module.exports = EventRegistryInstance;
