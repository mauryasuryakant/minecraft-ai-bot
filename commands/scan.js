module.exports = (bot, args) => {
    const blockName = args[0];
    if (!blockName) {
        bot.chat("Please specify a block name to scan for.");
        return;
    }

    const mcData = require('minecraft-data')(bot.version);
    const blockType = mcData.blocksByName[blockName];
    
    if (!blockType) {
        bot.chat(`Unknown block: ${blockName}`);
        return;
    }

    const blocks = bot.findBlocks({
        matching: blockType.id,
        maxDistance: 64,
        count: 5
    });

    if (blocks.length === 0) {
        bot.chat(`No ${blockName} found within 64 blocks.`);
    } else {
        bot.chat(`Found ${blocks.length} ${blockName} nearby. The nearest is at ${blocks[0].x}, ${blocks[0].y}, ${blocks[0].z}`);
    }
};
