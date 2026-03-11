module.exports = (bot) => {
    const items = bot.inventory.items();
    if (items.length === 0) {
        bot.chat("My inventory is empty.");
        return;
    }

    const output = items.map(item => `${item.count}x ${item.name}`).join(', ');
    bot.chat(`Inventory: ${output}`);
};
