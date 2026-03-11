const { goals } = require('mineflayer-pathfinder')

module.exports = (bot, username) => {

  const player = bot.players[username]

  if (!player || !player.entity) {
    bot.chat("I can't see you")
    return
  }

  const goal = new goals.GoalFollow(player.entity, 2)

  bot.chat("Following you")

  bot.pathfinder.setGoal(goal, true)

}