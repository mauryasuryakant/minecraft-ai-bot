module.exports = async (bot) => {
    bot.chat("Checking for food...");
    try {
        await bot.autoEat.eat();
        bot.chat("Yum! That was delicious.");
    } catch (err) {
        bot.chat("I'm not hungry or I don't have suitable food.");
    }
};
