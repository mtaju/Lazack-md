const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭────✧{𝙇𝘼𝙕𝘼𝘾𝙆-𝙈𝘿}✧────◆
│   *Préfix* : ${s.PREFIXE}
│   *Owner* : ${s.OWNER_NAME}
│   *Mode* : ${mode}
│   *Commands* : ${cm.length}
│   *Date* : ${date}
│   *Hour* : ${temps}
│   *Mémoire* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│   *Plateforme* : ${os.platform()}
│   *Développer* : 𝐋𝐀𝐙𝐀𝐂𝐊
│ _Lazack md a simple whatsapp bot give a 🌟_
╰─────✧LZCK_28✧─────◆ \n\n`;
    
let menuMsg = `
👋 Hello ${nomAuteurMessage} 👋

*List of commands :*
◇                             ◇
`;

    for (const cat in coms) {
        menuMsg += `╭────❏ ${cat} ❏`;
        for (const cmd of coms[cat]) {
            menuMsg += `
│ ${cmd}`;
        }
        menuMsg += `
╰═════════════⊷ \n`
    }

    menuMsg += `
◇            ◇
*»»————— 🇹🇿 —————««*
"To use a command, insert ${prefixe} followed by the command_name."
 
    LAZACK-MD
   Believe in you bro you can                                          
*»»————— 🇹🇿 —————««*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
