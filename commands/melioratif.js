const { Client, MessageEmbed } = require('discord.js');
const commands = require('./commands');

module.exports = class Random extends commands {

    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}compliment`);
    }

    static action (message) {
        var nombreAleatoire = Math.round(Math.random()*4);
        if (nombreAleatoire === 1) {
            message.reply("est beau", {tts: true})
        } else if (nombreAleatoire === 2) {
            message.reply("est très fort", {tts: true}) 
        } else if (nombreAleatoire === 3) {
            message.reply("est l'être le plus beau de l'univers", {tts: true}) 
        } else if (nombreAleatoire === 4) {
            message.reply("est l'être le plus s'intelligent de l'univers", {tts: true}) 
        } else if (nombreAleatoire === 5) {
            message.reply("", {tts: true}) 
        } else if (nombreAleatoire === 6) {
            message.reply("", {tts: true}) 
        } else if (nombreAleatoire === 7) {
            message.reply("", {tts: true}) 
        } else if (nombreAleatoire === 8) {
            message.reply("", {tts: true}) 
        }
    }
}