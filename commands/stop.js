module.exports = (bot) => {

  bot.chat("Stopping all actions")

  bot.pathfinder.setGoal(null)

  bot.clearControlStates()

}