module.exports = (bot, username) => {
    const player = bot.players[username];
    if (player && player.entity) {
        bot.lookAt(player.entity.position.offset(0, 1.6, 0));
        bot.chat(`Looking at ${username}`);
    } else {
        bot.chat("I can't see you.");
    }
};
