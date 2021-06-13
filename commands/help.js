const { Client, MessageEmbed } = require('discord.js');
const commands = require('./commands');

module.exports = class Infractions extends commands {
    
    
    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}help`);
    } 
    
    static action (message) {
        const embed = new MessageEmbed()
            .setColor('#0012FF')
            .setTitle('StingerBot Commands')
            .setDescription('Voici la liste des commands de StingerBot, préfix du bot est `./`.')
            .addField('\u200b', '\u200b')
            .addField("🤸‍♀️Loisir :", "`./note info` : vous pouvez noter les gens comme en chine. \n`./infobot` : pour ces info.")
            .addField('\u200b', '\u200b')
            .addField("⚔Moderation :", "`./ban` : ./ban <@user> \n`./warn` : ./warn <@user> <reason> \n`./infractions` : pour voir les warn ./infractions <@user> \n`./kick` : ./kick <@user>")
            .addField('\u200b', '\u200b')
            .addField("🎧Vocale :", "`./play` : ./play <link> \n`./volume` \n`./pars` : pour qque le bot part")
        message.channel.send(embed);
    }
}