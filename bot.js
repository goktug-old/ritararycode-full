const http = require('http');
const express = require('express');
const app = express();
const util = require('util');
const Enmap = require("enmap");
const fs = require("fs");
const chalk = require('chalk');
const Jimp = require('jimp');
const db = require('quick.db')  
const moment = require('moment');
const snekfetch = require('snekfetch');
const ayarlar = {
  "sahip": "495825025207894016",
  "sahip2": "521557165542998016"
}
const Discord = require('discord.js')

//////////////////////////////////////////////////////////////////////////////////////////////

var prefix = "rc!"

//////////////////////////////////////////////////////////////////////////////////////////////

module.exports = (client) => {
require('./util/eventLoader')(client);

client.on('message', message => {
if(message.author.bot) return;
if(message.content.toLowerCase().includes('js')) {
  return message.channel.send(`Hey **${message.author.username}**,\nKodlara Erişim Sağlamak İçin <#553544585872277505> kanalına bir göz at!`).then(msg => msg.delete(10000))
}})

//////////////////////////////////////////////////////////////////////////////////////////////

const log = message => {
  console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] ${message}`);
}; 

//////////////////////////////////////////////////////////////////////////////////////////////

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



//////////////////////////////////////////////////////////////////////////////////////////////

client.elevation = message => {
  if(!message.guild) {
    return; }
  let permlvl = 0;
  if (message.author.id === ayarlar.sahip) permlvl = 5;
  if (message.author.id === ayarlar.sahip2) permlvl = 5;
  if (message.author.id === '491231235801088000') permlvl = 6;
  if (message.author.id === '312927505252089866') permlvl = 6;
  if (message.author.id === "495856795277983754") permlvl = 6;
  if (message.author.id === ayarlar.sahip2) permlvl = 6;
  if (message.author.id === ayarlar.sahip) permlvl = 6;
  if (message.author.id === ayarlar.sahip) permlvl = 31; //SAHİP
  if (message.author.id === ayarlar.sahip2) permlvl = 31;
  if(message.author.id === "384385666345336832") permlvl = 31;
  return permlvl;
};

client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})
  
var a = ["KICK_MEMBERS", "BAN_MEMBERS", "ADMINISTRATOR", "MANAGE_CHANNELS", "MANAGE_GUILD", "MANAGE_MESSAGES", "MANAGE_NICKNAMES", "MANAGE_ROLES" , "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

client.on("guildMemberAdd", member => {
  if(!member.user.bot) return
  if(member.guild.id !== "530744872328626197") return;
  else {
    setTimeout(() => {
      if(a.some(b => member.hasPermission(b))) {
        member.kick("Yöneticili Pujt")
        member.guild.channels.get('577018950865518595').send(member.user.tag)
      }
    }, 500)
  }
})
  
  client.on("messageReactionAdd", (reaction,user) => {
    if(reaction.message.id !== "570234460142829608") return console.log("Testtir bu")
    else {
    client.guilds.get().member(user).addRole("580091788891521027")
    client.guilds.get().channels.get("553827797408415744").send(user.tag + " giriş yapmak icin :shield: emojisini ekledi")
    }
  })
  
}

setInterval(a=> {
require("http").get("http://ritararycode.glitch.me")
}, 180000)