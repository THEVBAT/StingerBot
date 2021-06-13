const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

module.exports = class Kick extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}kick`);
    }

    static action (message) {
        if (message.member.hasPermission("KICK_MEMBERS")) {
          const user = message.mentions.users.first();
          if (user) {
            const member = message.guild.member(user);
            if (member) {
              let args = message.content.toString().split(' ')
              args.shift()
              args.shift()
              let reason = args.join(' ');
              if (!reason) return message.reply('il n y a pas de raison fdp');
              member
                .kick({
                  reason: reason,
                })
                .then(() => {
                  message.reply(`J´ai bien kick ${user.tag}`, {tts: true});
                })
                .catch(err => {
                  message.reply('Je ne peux pas le kick');
                  console.error(err);
                });
            } else {
              message.reply("Il n'est pas sur le serveur connard !");
            }
          } else {
            message.reply("Vous n'avez mentionné personne idiot!");
          }
        } else {
            message.reply("Vous n'avez pas les permissions nécessaires espece de gueux");
        }
    }
}