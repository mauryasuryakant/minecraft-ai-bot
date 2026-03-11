const { goals } = require('mineflayer-pathfinder');

let homePos = null;

module.exports = (bot, args) => {
    const subCommand = args[0];

    if (subCommand === 'set') {
        homePos = bot.entity.position.clone();
        bot.chat(`Home set at ${Math.round(homePos.x)}, ${Math.round(homePos.y)}, ${Math.round(homePos.z)}`);
    } else {
        if (!homePos) {
            bot.chat("No home set. Use '!home set' first.");
            return;
        }
        bot.chat("Heading home...");
        bot.pathfinder.setGoal(new goals.GoalBlock(homePos.x, homePos.y, homePos.z));
    }
};
