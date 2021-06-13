const { Client, MessageEmbed } = require('discord.js');
const commands = require('./commands');
const fs = require('fs');

module.exports = class Infractions extends commands {
    
    
    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}infobot`);
    } 
    
    static action (message) {
        const embed = new MessageEmbed()
            .setTitle('StingerBot')
            .setColor('#0012FF')
            .setDescription('la nouvelle generation de botdeouf')
            .addField("Créateur:", "<@437204882123128832>")
            .addFields(
                { name: 'Langage :', value: 'javascipt', inline: true },
                { name: 'Librairie :', value: 'discord.js', inline: true },
                { name: 'prefix :', value: './', inline: true}
            )
        message.channel.send(embed);
    }
}