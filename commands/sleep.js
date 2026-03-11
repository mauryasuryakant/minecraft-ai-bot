module.exports = async (bot) => {
    const mcData = require('minecraft-data')(bot.version);
    const beds = bot.findBlocks({
        matching: block => mcData.blocksByName[block.name]?.name?.includes('bed'),
        maxDistance: 32,
        count: 1
    });

    if (beds.length === 0) {
        bot.chat("I can't find a bed nearby.");
        return;
    }

    const bedBlock = bot.blockAt(beds[0]);
    bot.chat("Going to sleep...");
    
    try {
        await bot.sleep(bedBlock);
        bot.chat("Good night!");
    } catch (err) {
        bot.chat(`I can't sleep right now: ${err.message}`);
    }
};
