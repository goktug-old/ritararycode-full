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
  
  

client.on('message', message => {
if(message.author.bot) return;
if(reklam.some( a => message.content.toLowerCase().includes(a))) {
  message.channel.send(`Hey **${message.author.username}**,\nReklam Yapmaya devam edersen atılacaksın. ${uyari}/5`)
}})
  
  client.on("message", message => {
if(message.author.bot) return;
if(message.content.toLowerCase().includes("api") || message.content.toLowerCase().match("key")) { message.reply("Simsek api bilgileri <#598245477955403829> kanalında") }
})

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
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 6;
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
  
client.on('guildMemberAdd', async member => { 
if(member.user.bot) {
  let rol = member.guild.roles.get("553222941488185345")
  member.addRole(rol, "Bot otorol").catch(e => { return; })
}})
  
}

setInterval(() => {
require("http").get("http://abdurrrrrrrzzaklandinizcasina.glitch.me")
}, 180000)