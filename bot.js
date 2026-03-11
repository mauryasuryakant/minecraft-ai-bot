const mineflayer = require('mineflayer')
const { pathfinder, Movements } = require('mineflayer-pathfinder')
const collectBlock = require('mineflayer-collectblock').plugin
const autoeat = require('mineflayer-auto-eat').loader

const config = require('./config')
const parser = require('./utils/parser')

const bot = mineflayer.createBot({
  host: config.host,
  port: config.port,
  username: config.username
})

bot.loadPlugin(pathfinder)
bot.loadPlugin(collectBlock)
bot.loadPlugin(autoeat)

bot.once('spawn', () => {
  const mcData = require('minecraft-data')(bot.version)
  const movements = new Movements(bot, mcData)
  bot.pathfinder.setMovements(movements)
  
  // Wait a bit to ensure plugins are fully initialized
  setTimeout(() => {
    if (bot.autoEat) {
      bot.autoEat.opts.priority = 'foodPoints'
      bot.autoEat.opts.bannedFood = ['rotten_flesh', 'pufferfish', 'chorus_fruit']
      bot.autoEat.opts.eatingTimeout = 3000
      console.log("Auto-eat configured")
    } else {
      console.warn("Auto-eat plugin not initialized yet")
    }
  }, 1000)

  console.log("Bot spawned")
})

bot.on('goal_reached', (goal) => {
  bot.chat("Target location reached!");
});

bot.on('path_update', (results) => {
  if (results.status === 'noPath') {
    bot.chat("I can't find a path to the target.");
  }
});

bot.on('messagestr', (message, messagePosition, jsonMsg) => {
  if (messagePosition !== 'chat') return;
  
  const match = message.match(/^<(.+?)>\s+(.+)$/);
  if (match) {
    const username = match[1];
    const text = match[2];
    if (username === bot.username) return;
    console.log(`${username} said: ${text}`);
    parser(bot, username, text);
  }
});
