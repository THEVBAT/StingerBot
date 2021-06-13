const { Client, MessageEmbed } = require('discord.js');
const commands = require('./commands');
const fs = require('fs');

module.exports = class Infractions extends commands {
    
    
    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}infractions`);
    } 
    
    static action (message) {
        let warns = JSON.parse(fs.readFileSync("./JSON/warn.json", "utf8"));

        if (!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("vous n'avez les permissions");
        if(!message.mentions.users.first()) return message.reply("Vous n'avez pas mis de mentions")
        let wUser = message.guild.member(message.mentions.users.first()) || message.mentions.users.first().id;
        if(!wUser) return message.reply("Je ne le trouve pas.");
        var warned = message.mentions.users.first();

        if(!warns[wUser.id]) return message.reply("Ce membre n'a pas de warn");
  
        const warnEmbed = new MessageEmbed()
            .setTitle('Infractions')
            .setColor("0012FF")
            .addField("utilisateur", warned)
            .addField("nombre de warn", warns[wUser.id].warns)
        message.channel.send(warnEmbed);  
    }
}
