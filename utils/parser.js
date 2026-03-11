const config = require('../config')

const goto = require('../commands/goto')
const mine = require('../commands/mine')
const follow = require('../commands/follow')
const stripmine = require('../commands/stripmine')
const collect = require('../commands/collect')
const stop = require('../commands/stop')
const status = require('../commands/status')
const come = require('../commands/come')
const eat = require('../commands/eat')
const sleep = require('../commands/sleep')
const drop = require('../commands/drop')
const scan = require('../commands/scan')

module.exports = (bot, username, message) => {

  if (!message.startsWith(config.commandPrefix)) return

  const args = message.slice(1).split(" ")
  const command = args.shift().toLowerCase()

  if (command === "goto") goto(bot, args)
  else if (command === "mine") mine(bot, args)
  else if (command === "follow") follow(bot, username)
  else if (command === "stripmine") stripmine(bot, args)
  else if (command === "collect") collect(bot, args)
  else if (command === "stop") stop(bot)
  else if (command === "status") status(bot)
  else if (command === "come") come(bot, username)
  else if (command === "eat") eat(bot)
  else if (command === "sleep") sleep(bot)
  else if (command === "drop") drop(bot)
  else if (command === "scan") scan(bot, args)
  else bot.chat(`Unknown command: ${command}`)

}
