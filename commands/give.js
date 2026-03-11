module.exports = async (bot, args) => {
    const itemName = args[0];
    const count = parseInt(args[1]) || 1;

    if (!itemName) {
        bot.chat("Please specify an item to give.");
        return;
    }

    const item = bot.inventory.items().find(i => i.name.includes(itemName));
    if (!item) {
        bot.chat(`I don't have any ${itemName}.`);
        return;
    }

    try {
        await bot.toss(item.type, null, Math.min(count, item.count));
        bot.chat(`Gave you ${Math.min(count, item.count)} ${item.name}.`);
    } catch (err) {
        bot.chat("I failed to give the item.");
    }
};
