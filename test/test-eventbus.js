var test = require('tape')
  , Eventbus = require('./../')

var verified = false

function verify(message, cb) {
    verified = true
    cb(null, verified)
}

test('exists', function(t) {
    t.ok(Eventbus, 'it exists you are sane')
    t.end()
})

test('can subscribe', function(t) {
    Eventbus.subscribe('testing-person-signup', verify)
    t.equals(Eventbus.getHandlers()['testing-person-signup'][0], verify, 'subscribed')
    t.end()
})

test('can publish', function(t) {
    t.plan(1)
    Eventbus.publish('testing-person-signup', {verifed:false}, function(err, d) {
        if (err) t.fail(err)
        t.ok(d, JSON.stringify(d))
        t.end()
    })
})

test('can poll', function(t) {
    t.plan(2)
    Eventbus.subscribe('testing-person-signup', function testHandler(person, callback) {
        t.equals(verified, true, 'first handler ran')
        t.ok(person, 'second handler ran, and got a message')
        t.end()
        process.exit()
    }).poll()
})
