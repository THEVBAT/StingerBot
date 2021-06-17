# StingerBot

<p align="center">
  <img src="./Img/StingerBotus.jpg">
</p>

<div align="center">
  <img alt="Discord" src="https://img.shields.io/discord/845773392002678794?color=697EC6&label=Discord&logo=Discord">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/THEVBAT/StingerBot?label=Code%20size">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/THEVBAT/StingerBot?color=cyan&label=Last%20Commit&logo=Visual%20Studio%20Code&logoColor=blue">
  <img alt="GitHub Release Date" src="https://img.shields.io/github/release-date/THEVBAT/StingerBot?color=2AA198&label=Last%20Release&logo=JavaScript">
</div>
<br>

StingerBot is a little Bot created by THEVBAT with the help of **Bat-Husky The Magnificent**.

## Installation

Add StingerBot to your server by clicking here : [Invite Link](https://discord.com/oauth2/authorize?client_id=835577703884521523&scope=bot&permissions=8)

## Setup

Download this code, put your information in JSON/config.json or it will not work. Finally, launch the bot with **nodejs** as below.

```bash
node index.js
```

## Usage

List of the main commands :

```
./infobot
./help
```

# An EcoDigital project

StingerBot is lovingly programmed with respect for the environment

```javascript
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

notes[nUser.id]["noteur"].push(message.author.id);
notes[nUser.id]["note"].push(nNote);
notes[nUser.id]["nombre"]++;

fs.writeFile("../Stingerbot/JSON/UserNote.json", JSON.stringify(names), (err) => {
    if (err) {
        console.log(err);
    }
});
```
