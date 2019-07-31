const Discord = require('discord.js');
const db = require('quick.db')

exports.run = function(client, message, args) {
  
  let bot;
    
    if (message.mentions.users.first()) {
      if(message.mentions.users.first().bot) {
      bot = message.mentions.users.first().id;
    }} else {
      if(isNaN(args[0])) return message.channel.send(':warning: | Bir ID Girmeli yada bot etiketlemelisin!')
      bot = args[0];
    }
  
if(!bot) return message.channel.send(':warning: | Bir ID Girmeli yada bot etiketlemelisin!')

message.delete(1000)
message.author.send(`https://discordapp.com/oauth2/authorize?client_id=${bot}&scope=bot&permissions=8`)
message.channel.send(":postbox: | Dm kutuna bak!").then(m => m.delete(1000))
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