# AWS SQS EventBus

Eventbus coordinates many EventQueues. It is a central place to publish events, and subscribe handlers to events.

Initializing the library requires `~/.aws/credentials` and a `REGION` environment variable. 

From there just regular business:

    var Eventbus = require('eventbus')

Publish an event:

    Eventbus.publish('person-signup', person, cb)

Subscribe handlers to listen for events:

    Eventbus
        .subscribe('person-signup', sendVerificationEmail)
        .subscribe('person-signup', sendVerificationSMS)
        .poll()


