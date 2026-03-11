const { goals } = require('mineflayer-pathfinder');

module.exports = (bot, username) => {
    const player = bot.players[username];

    if (!player || !player.entity) {
        bot.chat("I can't see you.");
        return;
    }

    const pos = player.entity.position;
    bot.chat("Coming to you.");
    bot.pathfinder.setGoal(new goals.GoalBlock(pos.x, pos.y, pos.z));
};
