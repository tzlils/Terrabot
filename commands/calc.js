const Discord = require("discord.js");
const vm = require('vm')


module.exports.config = {
    name: "calc",
    description: "Calculates an arithmic expression",
    usage: "{expression}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1,
    category: "math"
}

module.exports.run = (client, message, args) => {
  let res = calc(args.join(' '));
  var embed = new Discord.MessageEmbed()
      .setColor(Math.floor(Math.random() * (16777216 + 1)))
      .setTitle("Calculator")
      .addField('Result', res, true);
  message.channel.send({embed});
}

function calc(fn) {
  try {
    let res = safeEval(fn);
    return res;
  } catch(e) {
    return "Invalid Expression";
  }
}

function safeEval(code, context, opts) {
  var sandbox = {}
  var resultKey = 'TERRADICE_SAFEEVAL';
  sandbox[resultKey] = {}
  var clearContext = `
    (function(){
      Function = undefined;
      const keys = Object.getOwnPropertyNames(this).concat(['constructor']);
      keys.forEach((key) => {
        const item = this[key];
        if(!item || typeof item.constructor !== 'function') return;
        this[key].constructor = undefined;
      });
    })();
  `
  code = clearContext + resultKey + '=' + code
  if (context) {
    Object.keys(context).forEach(function (key) {
      sandbox[key] = context[key]
    })
  }
  vm.runInNewContext(code, sandbox, opts)
  return sandbox[resultKey]
}
