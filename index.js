const Discord = require('discord.js');
const ytdl = require('ytdl-core')
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
const { Client, MessageEmbed } = require('discord.js');
const { prefix, token} = require('./JSON/config.json');
const Warn = require('./commands/warn');
const Infractions = require('./commands/infractions');
const Infobot = require('./commands/infobot')
const Kick = require('./commands/kick');
const Ban = require('./commands/ban');
const Note = require('./commands/note');
const Help = require('./commands/help');
const Melio = require('./commands/melioratif');
const slashp = require('./commands/slash');

//const queue = new Map();

bot.on('ready', function() {
    console.log("pret");
    setInterval(() => {
        bot.user.setActivity("t/help")
        setTimeout(() => {
            bot.user.setActivity("ta dead sa chacale", { type: 'STREAMING', url: 'https://www.twitch.tv/THEVBAT08' })
        }, 10000);
        setTimeout(() => {
            bot.user.setActivity("\"Tu la bouge ta caisse connard!\"", { type: 'STREAMING', url: 'https://www.twitch.tv/THEVBAT08' })
        }, 20000);
        setTimeout(() => {
            bot.user.setActivity("salut", { type: 'PLAYING' })
        }, 30000);
        setTimeout(() => {
            bot.user.setActivity("la soloQ un plaisir", { type: 'STREAMING', url: 'https://www.twitch.tv/THEVBAT08' })
        }, 40000);
    }, 50000);
    slashp.execute(Discord, bot)
});

bot.on('message',function (message) {
    if (message.author.bot) return;
    let commandUsed = Warn.parse(message, prefix) || Infractions.parse(message, prefix) || Infobot.parse(message, prefix) || Kick.parse(message, prefix) || Ban.parse(message, prefix) || Note.parse(message, prefix) || Help.parse(message, prefix) || Melio.parse(message, prefix)
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (message.content.toString().toLowerCase().startsWith(`${prefix}viens`)) {

        if (!message.member.voice.channel) return message.reply('va dans un channel vocal!');
        const connection = await message.member.voice.channel.join();

    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}pars`)) {
        if (!message.member.voice.channel) return message.reply('va dans un channel vocal!');
        const connection = await message.member.voice.channel.leave();      
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}play`)) {
        if (!message.member.voice.channel) return message.reply('va dans un channel vocal je ne le repeterait pas!');
        let args = message.content.toString().split(' ')[1]
        if (!args) return message.reply("tu vas te faire respecter par persone si tu fais ca");
        const songInfo = await ytdl.getInfo(args);
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(ytdl(args))   
        const embed = new MessageEmbed()
            .setColor("0012FF")
            .addField("joue", `[${songInfo.videoDetails.title}](${songInfo.videoDetails.video_url})`)
        message.channel.send(embed);
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}volume`)) {
        if (!message.member.voice.channel) return message.reply('va dans un channel vocal je ne le repeterait pas!');
        let volume = message.content.toString().split(' ')[1]
        if (!volume) return message.reply("tu vas te faire respecter par persone si tu fais ca");
        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.dispatcher;
        dispatcher.setVolume(volume)
        const embed = new MessageEmbed()
            .setColor("0012FF")
            .addField("volume mis a", `${volume * 100}%`)
        message.channel.send(embed);
    } else if (message.content.toString().toLowerCase().startsWith(`${prefix}ping`)) {
        let args = message.content.toString().substr(6);
        if (message.content.toString().toLowerCase().split(' ')[1] == "caisse") bot.user.setActivity("\"Tu la bouge ta caisse connard!\"", { type: 'STREAMING', url: 'https://www.twitch.tv/THEVBAT08' });
        message.channel.send("ping réussi ma gueule");
        if (message.content.toString().toLowerCase().split(' ')[1] == "salut") bot.user.setActivity("salut", { type: 'PLAYING' });
        if (message.content.toString().toLowerCase().split(' ')[1] == "chacale") bot.user.setActivity("ta dead sa chacale", { type: 'STREAMING', url: 'https://www.twitch.tv/THEVBAT08' });
        if (message.content.toString().toLowerCase().split(' ')[1] == "soloq") bot.user.setActivity("la soloQ un plaisir", { type: 'STREAMING', url: 'https://www.twitch.tv/THEVBAT08' });
    } else if (message.content.toString().toLowerCase().startsWith (`${prefix}infoping`)) {
        const embed = new MessageEmbed()
            .setColor("0012FF")
            .setTitle("Ping")
            .setDescription("Tout les type de ping")
            .addField("ping:", "`t/ping caisse` \n `t/ping salut` \n `t/ping chacale` \n `t/soloq`")
        message.channel.send(embed)
    }
});

bot.login(token);
