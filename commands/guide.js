const { goals } = require('mineflayer-pathfinder');

module.exports = (bot, username, args) => {
    const targetType = args[0];
    if (!targetType) {
        bot.chat("Please specify what you want me to guide you to (e.g., !guide village or !guide diamond_ore).");
        return;
    }

    const player = bot.players[username];
    if (!player || !player.entity) {
        bot.chat("I can't see you. You must be nearby to be guided.");
        return;
    }

    let targetPos = null;
    const mcData = require('minecraft-data')(bot.version);

    if (targetType.toLowerCase() === 'village') {
        const bellBlock = mcData.blocksByName['bell'];
        if (bellBlock) {
            const bellPositions = bot.findBlocks({
                matching: bellBlock.id,
                maxDistance: 128,
                count: 1
            });
            if (bellPositions.length > 0) {
                targetPos = bellPositions[0];
            }
        }
        
        if (!targetPos) {
            const villager = bot.nearestEntity(e => e.type === 'mob' && e.name === 'villager');
            if (villager) {
                targetPos = villager.position;
            }
        }
    } else {
        const blockType = mcData.blocksByName[targetType];
        if (blockType) {
            const blockPositions = bot.findBlocks({
                matching: blockType.id,
                maxDistance: 64,
                count: 1
            });
            if (blockPositions.length > 0) {
                targetPos = blockPositions[0];
            }
        }
    }

    if (!targetPos) {
        bot.chat(`I couldn't find any ${targetType} nearby.`);
        return;
    }

    bot.chat(`I'll lead you to ${targetType}. Stay close!`);

    const goal = new goals.GoalBlock(targetPos.x, targetPos.y, targetPos.z);
    
    bot.guideInterval = setInterval(() => {
        const playerEntity = player.entity;
        if (!playerEntity) {
            bot.chat("I lost track of you. Stopping guide.");
            bot.pathfinder.setGoal(null);
            clearInterval(bot.guideInterval);
            bot.guideInterval = null;
            return;
        }

        const distToPlayer = bot.entity.position.distanceTo(playerEntity.position);
        const distToTarget = bot.entity.position.distanceTo(targetPos);

        if (distToTarget < 2) {
            bot.chat(`We have arrived at the ${targetType}!`);
            bot.pathfinder.setGoal(null);
            clearInterval(bot.guideInterval);
            bot.guideInterval = null;
            return;
        }

        if (distToPlayer > 8) {
            // Player is too far, wait
            if (bot.pathfinder.goal) {
                bot.chat("Wait for me!");
                bot.pathfinder.setGoal(null);
            }
        } else if (distToPlayer < 4) {
            // Player is close enough, resume moving to target
            if (!bot.pathfinder.goal) {
                bot.pathfinder.setGoal(goal);
            }
        }
    }, 1000);
};
