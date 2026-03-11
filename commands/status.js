module.exports = (bot) => {
    const health = Math.round(bot.health);
    const hunger = Math.round(bot.food);
    const { x, y, z } = bot.entity.position.floored();
    
    bot.chat(`Health: ${health}/20 | Hunger: ${hunger}/20 | Pos: ${x}, ${y}, ${z}`);
};
