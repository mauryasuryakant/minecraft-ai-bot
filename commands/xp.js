module.exports = (bot) => {
    bot.chat(`I have ${bot.experience.level} levels and ${Math.round(bot.experience.progress * 100)}% progress to the next level.`);
};
