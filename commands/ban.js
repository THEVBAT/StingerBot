const commands = require('./commands');
const { Client, MessageEmbed } = require('discord.js');

module.exports = class Ban extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}ban`);
    }

    static action (message) {
        if (message.member.hasPermission("BAN_MEMBERS")) {
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
                .ban({
                  reason: reason,
                })
                .then(() => {
                  message.reply(`J´ai bien banni ${user.tag}`, {tts: true});
                })
                .catch(err => {
                  message.reply('Je ne peux pas le bannir');
                  console.error(err);
                });
            } else {
              message.reply("Il n'est pas sur le serveur connard !");
            }
          } else {
            message.reply("Vous n'avez mentionné personne idiot!");
          }
          }else {
               message.reply("Vous n'avez pas les permissions nécessaires espece de gueux");
          }
    }
}