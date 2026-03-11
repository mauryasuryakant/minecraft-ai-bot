module.exports = async (bot) => {
    const rod = bot.inventory.items().find(i => i.name === 'fishing_rod');
    if (!rod) {
        bot.chat("I need a fishing rod.");
        return;
    }

    bot.chat("Starting to fish... Use !stop to quit.");
    try {
        await bot.equip(rod, 'hand');
        
        const fishLoop = async () => {
            try {
                await bot.fish();
                fishLoop(); // Repeat
            } catch (err) {
                bot.chat("Fishing interrupted.");
            }
        };
        fishLoop();
    } catch (err) {
        bot.chat("I can't fish here.");
    }
};
