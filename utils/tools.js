/**
 * Automatically equips the best tool for the given block.
 * @param {import('mineflayer').Bot} bot 
 * @param {import('prismarine-block').Block} block 
 */
async function equipBestTool(bot, block) {
    if (!block) return;
    
    const tool = bot.pathfinder.bestHarvestTool(block);
    if (tool) {
        await bot.equip(tool, 'hand');
    }
}

module.exports = { equipBestTool };
