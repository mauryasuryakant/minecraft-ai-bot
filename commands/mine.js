const { equipBestTool } = require('../utils/tools');

module.exports = async (bot, args) => {

  const blockName = args[0]

  const mcData = require('minecraft-data')(bot.version)
  
  const blockType = mcData.blocksByName[blockName];
  if (!blockType) {
    bot.chat(`Invalid block name: ${blockName}`);
    return;
  }

  const block = bot.findBlock({
    matching: blockType.id,
    maxDistance: 32
  })

  if (!block) {
    bot.chat("No block found")
    return
  }

  bot.chat("Mining " + blockName)

  try {
    await equipBestTool(bot, block);
    await bot.collectBlock.collect(block);
    bot.chat(`Successfully mined ${blockName}`);
  } catch (err) {
    bot.chat(`Failed to mine ${blockName}: ${err.message}`);
  }

}