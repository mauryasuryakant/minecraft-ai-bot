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
const findvillage = require('../commands/findvillage')
const guide = require('../commands/guide')
const inventory = require('../commands/inventory')
const guard = require('../commands/guard')
const torch = require('../commands/torch')
const pos = require('../commands/pos')
const xp = require('../commands/xp')
const home = require('../commands/home')
const lookat = require('../commands/lookat')
const give = require('../commands/give')
const loot = require('../commands/loot')
const equip = require('../commands/equip')
const deposit = require('../commands/deposit')
const fish = require('../commands/fish')
const farm = require('../commands/farm')
const say = require('../commands/say')
const smelt = require('../commands/smelt')

module.exports = (bot, username, message) => {

  if (!message.startsWith(config.commandPrefix)) return

  // Cleanup any active guide loop
  if (bot.guideInterval) {
    clearInterval(bot.guideInterval);
    bot.guideInterval = null;
  }

  // Cleanup any active guard loop
  if (bot.guardInterval) {
    clearInterval(bot.guardInterval);
    bot.guardInterval = null;
  }

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
  else if (command === "findvillage") findvillage(bot, args)
  else if (command === "guide") guide(bot, username, args)
  else if (command === "inventory" || command === "inv") inventory(bot)
  else if (command === "guard") guard(bot, username)
  else if (command === "torch") torch(bot)
  else if (command === "pos") pos(bot)
  else if (command === "xp") xp(bot)
  else if (command === "home") home(bot, args)
  else if (command === "lookat") lookat(bot, username)
  else if (command === "give") give(bot, args)
  else if (command === "loot") loot(bot)
  else if (command === "equip") equip(bot, args)
  else if (command === "deposit") deposit(bot)
  else if (command === "fish") fish(bot)
  else if (command === "farm") farm(bot)
  else if (command === "say") say(bot, args)
  else if (command === "smelt") smelt(bot)
  else bot.chat(`Unknown command: ${command}`)

}
