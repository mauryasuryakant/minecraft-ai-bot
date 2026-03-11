module.exports = (bot, args) => {
    const mcData = require('minecraft-data')(bot.version);
    const bellBlock = mcData.blocksByName['bell'];
    
    if (!bellBlock) {
        bot.chat("I don't know what a bell is in this version.");
        return;
    }

    // Search for a bell within 128 blocks
    const bellPositions = bot.findBlocks({
        matching: bellBlock.id,
        maxDistance: 128,
        count: 1
    });

    if (bellPositions.length > 0) {
        const bell = bellPositions[0];
        bot.chat(`I found a village bell nearby at ${bell.x}, ${bell.y}, ${bell.z}`);
        return;
    }

    // If no bell, search for villagers
    const villager = bot.nearestEntity(e => e.type === 'mob' && e.name === 'villager');
    if (villager) {
        const pos = villager.position;
        bot.chat(`I found a villager nearby at ${Math.round(pos.x)}, ${Math.round(pos.y)}, ${Math.round(pos.z)}. There's likely a village here.`);
        return;
    }

    bot.chat("No village found within 128 blocks (couldn't see any bells or villagers).");
};
