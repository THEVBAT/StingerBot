const { Client, MessageEmbed } = require('discord.js');
const commands = require('./commands');
const fs = require('fs');
const note = new Map();
const list = new Set();

module.exports = class Note extends commands {
    
    
    static match (message, prefix) {
        return message.content.toString().toLowerCase().startsWith(`${prefix}note`);
    } 
    
    static action (message) {
        let nUser = message.mentions.users.first();
        let args = message.content.toString().substr(6);
        if (!message .content.toString().toLowerCase().split(' ')[1]) return message.reply("Vous n'avez pas choisie de commande(pas Ubers eat)")
        if (message.content.toString().toLowerCase().split(' ')[1] == "info") return this.info(message);
        if (message.content.toString().toLowerCase().split(' ')[1] == "list") return this.list(message);
        if (message.content.toString().toLowerCase().split(' ')[1] == "noter") return this.UserNoter(message, nUser);
        if (message.content.toString().toLowerCase().split(' ')[1] == "note") return this.InfoUser(message, nUser);
    }

    static UserNoter (message, nUser) {
        let notes = JSON.parse(fs.readFileSync("./JSON/note.json", "utf8"))
        let names = JSON.parse(fs.readFileSync("./JSON/UserNote.json", "utf8"))
        if (!nUser) return message.channel.send("Qui voulez-vous noter ? `./note noter <user> <note>`");

        if (!notes[nUser.id]) {
            notes[nUser.id] = {
               nombre: 0,
               note: [],
               noteur: []
            };

            let UserInfo = {
                name: nUser.tag,
                id: nUser.id
            }
            names["User"].push(UserInfo);
        }

        for (const noteur in notes[nUser.id]["noteur"]) {
            if (message.author.id == notes[nUser.id]["noteur"][noteur]) return message.reply("Vous l'avez déjà noté!")
        }

        let nNote = message.content.toString().split(' ')[3]
        nNote = Number(nNote);
        if (nNote > 10 || nNote < 0) return message.reply("La note est comprise entre 0 et 10");      

        notes[nUser.id]["noteur"].push(message.author.id)
        notes[nUser.id]["note"].push(nNote);
        notes[nUser.id]["nombre"]++;

        fs.writeFile("./JSON/UserNote.json", JSON.stringify(names), (err) => {
            if (err) {
                console.log(err);
            }
        });

        fs.writeFile("./JSON/note.json", JSON.stringify(notes), (err) => {
            if (err) {
                console.log(err);
            }
        });

        const embed1 = new MessageEmbed()
            .setColor("0012FF")
            .setTitle("Note")
            .setDescription(`Vous avez attribué à ${nUser} une note de \`${nNote}\` sur 10`)
        message.channel.send(embed1)
    }

    static info (message) {
        const embed = new MessageEmbed()
            .setColor("0012FF")
            .setTitle("Note")
            .setDescription("Grâce à cette commande vous pourrez noter les gens comme en Chine. Génial non?")
            .addField("Commands :", "`./note info` \n `./note list` \n `./note noter` \n `./note noter <user> <note>`")
        message.channel.send(embed)
    }

    static InfoUser (message, nUser) {
        let notes = JSON.parse(fs.readFileSync("./JSON/note.json", "utf8"))
        var num = 0;

        for (var i = 0; i < notes[nUser.id]["note"].length; i++) {
            num += notes[nUser.id]["note"][i];
        }

        var denum = notes[nUser.id]["note"].length;

        var moyenne = num/denum
        message.channel.send(`La moyenne de ${nUser} est de **${moyenne}**`)
    }

    static list (message) {
        let names = JSON.parse(fs.readFileSync("./JSON/UserNote.json", "utf8"))
        let notes = JSON.parse(fs.readFileSync("./JSON/note.json", "utf8"))
        message.channel.send("Les personnes notées sont :")
        for (const index in names["User"]) {
            var nUser = names["User"][index]["id"]
            var num = 0;

            for (var i = 0; i < notes[nUser]["note"].length; i++) {
                num += notes[nUser]["note"][i];
            }

            var denum = notes[nUser]["note"].length;

            var moyenne = num/denum

            message.channel.send(`>>> ${names["User"][index]["name"]} : \`${moyenne}\``)
        }
    }
}
