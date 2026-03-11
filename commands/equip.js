module.exports = async (bot, args) => {
    const itemName = args[0];
    if (!itemName) {
        bot.chat("Specify an item to equip (e.g., iron_helmet, diamond_pickaxe).");
        return;
    }

    const item = bot.inventory.items().find(i => i.name.includes(itemName));
    if (!item) {
        bot.chat(`I don't have ${itemName}.`);
        return;
    }

    try {
        let destination = 'hand';
        if (itemName.includes('helmet')) destination = 'head';
        else if (itemName.includes('chestplate')) destination = 'torso';
        else if (itemName.includes('leggings')) destination = 'legs';
        else if (itemName.includes('boots')) destination = 'feet';
        else if (itemName.includes('shield')) destination = 'off-hand';

        await bot.equip(item, destination);
        bot.chat(`Equipped ${item.name}.`);
    } catch (err) {
        bot.chat(`Failed to equip ${item.name}.`);
    }
};
