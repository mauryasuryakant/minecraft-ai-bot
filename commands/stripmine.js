const { Vec3 } = require('vec3');
const { equipBestTool } = require('../utils/tools');

module.exports = async (bot, args) => {
    const direction = args[0]?.toLowerCase() || 'north';
    const distance = parseInt(args[1]) || 20;

    const directions = {
        north: new Vec3(0, 0, -1),
        south: new Vec3(0, 0, 1),
        east: new Vec3(1, 0, 0),
        west: new Vec3(-1, 0, 0)
    };

    const offset = directions[direction];
    if (!offset) {
        bot.chat(`Invalid direction: ${direction}. Use north, south, east, or west.`);
        return;
    }

    bot.chat(`Starting strip mining ${direction} for ${distance} blocks.`);

    try {
        for (let i = 0; i < distance; i++) {
            // Check for stop signal or other conditions if needed
            
            // Mine the two blocks in front (1x2 tunnel)
            const upperBlockPos = bot.entity.position.offset(offset.x, 1, offset.z).floored();
            const lowerBlockPos = bot.entity.position.offset(offset.x, 0, offset.z).floored();

            const blocksToMine = [upperBlockPos, lowerBlockPos];

            for (const pos of blocksToMine) {
                const block = bot.blockAt(pos);
                if (block && block.name !== 'air') {
                    await equipBestTool(bot, block);
                    await bot.dig(block);
                }
            }

            // Move forward
            const targetPos = bot.entity.position.plus(offset).floored();
            
            // Use simple movement for now, or pathfinder for reliability
            bot.setControlState('forward', true);
            await new Promise(r => setTimeout(r, 500)); // Short burst forward
            bot.setControlState('forward', false);
            
            // Optional: wait a bit to ensure bot has moved
            await new Promise(r => setTimeout(r, 200));
        }
        bot.chat("Strip mining finished successfully.");
    } catch (err) {
        bot.chat(`Strip mining interrupted: ${err.message}`);
        console.error(err);
    }
};
