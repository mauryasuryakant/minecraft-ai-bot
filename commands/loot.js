const { goals } = require('mineflayer-pathfinder');

module.exports = async (bot) => {
    const items = bot.entities;
    let found = false;

    for (const id in items) {
        const entity = items[id];
        if (entity.name === 'item' || entity.name === 'Item' || entity.type === 'item') {
            if (entity.position.distanceTo(bot.entity.position) < 15) {
                found = true;
                bot.chat("Picking up items...");
                bot.pathfinder.setGoal(new goals.GoalBlock(entity.position.x, entity.position.y, entity.position.z));
                // Stop after the first one to avoid logic loops, user can run again
                return;
            }
        }
    }

    if (!found) bot.chat("No items found on the ground nearby.");
};
