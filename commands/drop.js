module.exports = async (bot) => {
    const items = bot.inventory.items();
    if (items.length === 0) {
        bot.chat("My inventory is empty.");
        return;
    }

    bot.chat("Dropping all items.");
    for (const item of items) {
        try {
            await bot.tossStack(item);
        } catch (err) {
            console.error(`Failed to drop ${item.name}: ${err.message}`);
        }
    }
};
