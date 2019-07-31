const Discord = require('discord.js');
const db = require('quick.db')

exports.run = function(client, message, args) {
  
    var sebep = args.slice(1).join(' ');
    
  let bot;
    
    if (message.mentions.users.first()) {
      if(message.mentions.users.first().bot) {
      bot = message.mentions.users.first().id;
    }} else {
      if(isNaN(args[0])) return message.channel.send(':warning: | Bir ID Girmeli yada bot etiketlemelisin!')
      bot = args[0];
    }
  
if(!bot) return message.channel.send(':warning: | Bir ID Girmeli yada bot etiketlemelisin!')  
else if (!sebep) return message.reply('Bir Sebep Girmelisin')


    var i = db.fetch(`sahip_${bot}`)
  
        var embed = new Discord.RichEmbed()
            .setTimestamp()
            .addField("Eylem:", "Başvuru Ret")
            .addField("Reddeden Kullanıcı:", message.author.tag)
            .addField("Sebep" , sebep)
            .addField("Redddilen Bot Sahibi", client.users.get(i).tag)
            .addField('Reddedilen Bot',client.users.get(bot).tag)
            .setColor('RED')
           
        client.users.get(i).send(":x: | " + client.users.get(bot) + " adlı botunuz kabul edilmedi! Sebebi: "+ sebep)
        client.channels.get('553542376887681025').send(embed);
        message.reply("Ret Mesajı Gönderildi.");
    
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ret'],
  permLevel: 6
};

exports.help = {
  name: 'bot-ret',
  description: 'JavaScript Rolü alırsın',
  usage: 'js'
};
