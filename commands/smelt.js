module.exports = async (bot) => {
    const mcData = require('minecraft-data')(bot.version);
    const furnaceBlock = bot.findBlock({
        matching: mcData.blocksByName.furnace.id,
        maxDistance: 8
    });

    if (!furnaceBlock) {
        bot.chat("No furnace nearby.");
        return;
    }

    const furnace = await bot.openFurnace(furnaceBlock);
    bot.chat("Opened furnace.");
    // Simple logic: put first smeltable item in input and coal in fuel
    const fuel = bot.inventory.items().find(i => i.name === 'coal' || i.name === 'charcoal');
    const input = bot.inventory.items().find(i => i.name.includes('raw_') || i.name.includes('ore'));

    if (fuel) await furnace.putFuel(fuel.type, null, Math.min(fuel.count, 8));
    if (input) await furnace.putInput(input.type, null, Math.min(input.count, 8));
    
    bot.chat("Smelting started.");
    furnace.close();
};
