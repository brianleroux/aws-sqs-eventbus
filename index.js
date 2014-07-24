var EventQueue = require('aws-sqs-eventqueue')
  , _handlers = {}

function getMessages() {
    // loop through each queue
    Object.keys(_handlers).forEach(function(eventName) {
        // create an EventQueue and retrive one message
        new EventQueue(eventName).pop(function(err, message) {
            
            // FIXME need to log queue errors and continue
            if (err) console.error(err)

            if (message) {
                // apply handlers for message
                _handlers[eventName].forEach(function(handler) {
                    handler(message, function(err, data) {
                        
                        // FIXME if there was an error log it and move to next handler
                        if (err) console.error(err)
                    })
                })
            }
        })
    })
}

module.exports = {

    getHandlers: function() {
        return _handlers
    },

    publish: function publish(topic, message, cb) {
        new EventQueue(topic).push(message, cb)
    },

    subscribe: function subscribe(topic, handler) {
        if (!_handlers[topic]) _handlers[topic] = []
        _handlers[topic].push(handler)
        return this
    },

    poll: function() {
        setInterval(getMessages, 2000)
    }
}
