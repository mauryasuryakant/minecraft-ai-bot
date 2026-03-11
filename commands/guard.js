const { goals } = require('mineflayer-pathfinder');

module.exports = (bot, username) => {
    const player = bot.players[username];
    if (!player || !player.entity) {
        bot.chat("I can't see you to guard you.");
        return;
    }

    bot.chat("I'm guarding you now. I'll attack any nearby monsters.");
    
    // Set a follow goal
    const goal = new goals.GoalFollow(player.entity, 3);
    bot.pathfinder.setGoal(goal, true);

    bot.guardInterval = setInterval(() => {
        // If the player is gone, stop guarding
        if (!player.entity) {
            clearInterval(bot.guardInterval);
            bot.guardInterval = null;
            return;
        }

        const entity = bot.nearestEntity(e => 
            e.type === 'mob' && 
            e.position.distanceTo(bot.entity.position) < 8 &&
            (e.mobType === 'Zombie' || e.mobType === 'Skeleton' || e.mobType === 'Spider' || e.mobType === 'Creeper' || e.mobType === 'Enderman')
        );

        if (entity) {
            const sword = bot.inventory.items().find(item => item.name.includes('sword'));
            if (sword) {
                bot.equip(sword, 'hand').catch(() => {});
            }
            bot.attack(entity);
        }
    }, 1000);
};
