const { equipBestTool } = require('../utils/tools');

module.exports = async (bot, args) => {

  const blockName = args[0]

  const mcData = require('minecraft-data')(bot.version)
  
  const blockType = mcData.blocksByName[blockName];
  if (!blockType) {
    bot.chat(`Invalid block name: ${blockName}`);
    return;
  }

  const blocks = bot.findBlocks({
    matching: blockType.id,
    maxDistance: 32,
    count: 5
  })

  if (blocks.length === 0) {
    bot.chat(`No ${blockName} found nearby.`);
    return;
  }

  bot.chat(`Collecting ${blocks.length} ${blockName} blocks.`);

  for (const pos of blocks) {
    const block = bot.blockAt(pos);
    if (block) {
      try {
        await equipBestTool(bot, block);
        await bot.collectBlock.collect(block);
      } catch (err) {
        console.error(`Failed to collect block at ${pos}: ${err.message}`);
      }
    }
  }

  bot.chat("Collection finished")

}