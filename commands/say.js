module.exports = (bot, args) => {
    const msg = args.join(' ');
    if (msg) bot.chat(msg);
};
