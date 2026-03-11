module.exports = (bot) => {
    const pos = bot.entity.position;
    bot.chat(`I am at X: ${Math.round(pos.x)}, Y: ${Math.round(pos.y)}, Z: ${Math.round(pos.z)}`);
};
