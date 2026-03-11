module.exports = async (bot) => {
    const chestBlock = bot.findBlock({
        matching: [
            require('minecraft-data')(bot.version).blocksByName.chest.id,
            require('minecraft-data')(bot.version).blocksByName.trapped_chest.id,
            require('minecraft-data')(bot.version).blocksByName.barrel.id
        ],
        maxDistance: 8
    });

    if (!chestBlock) {
        bot.chat("No chest or barrel nearby.");
        return;
    }

    try {
        const chest = await bot.openChest(chestBlock);
        for (const item of bot.inventory.items()) {
            // Keep tools and food
            if (item.name.includes('pickaxe') || item.name.includes('sword') || item.name.includes('axe') || item.name.includes('shovel')) continue;
            await chest.deposit(item.type, null, item.count);
        }
        chest.close();
        bot.chat("Deposited items.");
    } catch (err) {
        bot.chat("I had trouble accessing the chest.");
    }
};
