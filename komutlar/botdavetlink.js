const Discord = require('discord.js');
const db = require('quick.db')

exports.run = function(client, message, args) {
  
  let bot;
    
    if (message.mentions.users.first()) {
      bot = message.mentions.users.first().id;
    } else {
        bot = args[0];
    }
  
if(!bot) return message.channel.send(':x: | Bir ID Girmelisin')

message.reply(`https://discordapp.com/oauth2/authorize?client_id=${bot}&scope=bot&permissions=8`)
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bl'], 
  permLevel: 0
};

exports.help = {
  name: 'botlink', 
  description: "bot hakkındaki önerilerinizi bot sahiplerine ulaştırır", 
  usage: 'bot-ekle <mesaj>' 
};