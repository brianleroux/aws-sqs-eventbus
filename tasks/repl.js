var repl = require("repl")
 
var replServer = repl.start({prompt:'Eventbus> '})
 
replServer.context.Eventbus = require('./../')
