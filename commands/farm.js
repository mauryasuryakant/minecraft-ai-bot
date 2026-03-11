module.exports = async (bot) => {
    const mcData = require('minecraft-data')(bot.version);
    const blocks = bot.findBlocks({
        matching: [mcData.blocksByName.wheat.id, mcData.blocksByName.carrots.id, mcData.blocksByName.potatoes.id],
        maxDistance: 10,
        count: 20
    });

    if (blocks.length === 0) {
        bot.chat("No crops found nearby.");
        return;
    }

    bot.chat(`Found ${blocks.length} crops. Harvesting...`);
    for (const pos of blocks) {
        const block = bot.blockAt(pos);
        // Metadata 7 is fully grown for wheat/carrots/potatoes in many versions
        if (block.metadata === 7) {
            await bot.dig(block);
            // Replant logic could be added here if the bot has seeds
        }
    }
    bot.chat("Harvesting complete.");
};
