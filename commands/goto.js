const { goals } = require('mineflayer-pathfinder')

module.exports = (bot, args) => {

  const x = parseInt(args[0])
  const y = parseInt(args[1])
  const z = parseInt(args[2])

  if (isNaN(x) || isNaN(y) || isNaN(z)) {
    bot.chat("Invalid coordinates. Usage: !goto X Y Z");
    return;
  }

  const goal = new goals.GoalBlock(x, y, z)

  bot.chat(`Moving to ${x}, ${y}, ${z}`);

  bot.pathfinder.setGoal(goal)
  
  // We can't easily wait for the goal to be reached in this function 
  // without making it async, but pathfinder will handle it.
  // One way to give feedback is to listen for the goal_reached event.
}