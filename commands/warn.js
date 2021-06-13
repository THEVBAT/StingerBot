const { Client, MessageEmbed } = require('discord.js');
const commands = require('./commands');
const fs = require('fs');

module.exports = class Warn extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}warn`);
    }

    static action (message) {
        let warns = JSON.parse(fs.readFileSync("../Stingerbot/JSON/warn.json", "utf8"));
        
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('ta pas les perm');
        let wUser = message.guild.member(message.mentions.users.first()) || message.mentions.users.first();
        if (!wUser) return message.reply("il n'est pas la");
        if (wUser.hasPermission('ADMINISTRATOR')) return message.reply("impossible de le warn il est trop puissant");

        var msg = message.content.toString().split(' ')
        msg.shift();
        msg.shift();
        var reason = msg.join(' ');

        if (!reason) return message.reply("tu n'a pas mis de reason");

        if(!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };
        
        warns[wUser.id].warns++;

        fs.writeFile("./JSON/warn.json", JSON.stringify(warns), (err) => {
            if (err) {
                console.log(err);
            }
        });

        const warnEmbed = new MessageEmbed()
            .setDescription("Warns")
            .setAuthor(`de ${message.author.username}`)
            .setColor("#0042ff")
            .addField("Warned l'utilisateur", wUser)
            .addField("Raison", reason)
        message.channel.send(warnEmbed);

    }
}