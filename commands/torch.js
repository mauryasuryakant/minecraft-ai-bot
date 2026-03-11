module.exports = async (bot) => {
    const torchItem = bot.inventory.items().find(item => item.name === 'torch');

    if (!torchItem) {
        bot.chat("I don't have any torches.");
        return;
    }

    const pos = bot.entity.position.floored();
    const block = bot.blockAt(pos);
    
    if (block.name !== 'air') {
        bot.chat("I can't place a torch inside a block.");
        return;
    }

    try {
        await bot.equip(torchItem, 'hand');
        // Place on the ground
        const referenceBlock = bot.blockAt(pos.offset(0, -1, 0));
        if (referenceBlock && referenceBlock.name !== 'air') {
            await bot.placeBlock(referenceBlock, { x: 0, y: 1, z: 0 });
            bot.chat("Placed a torch.");
        } else {
             bot.chat("No solid ground to place a torch on.");
        }
    } catch (err) {
        console.error(err);
        bot.chat("I failed to place the torch.");
    }
};
