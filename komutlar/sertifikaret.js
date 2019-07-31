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
    else if (!sebep) return message.reply('Bir Sebep Girmelisin')
  
    var sebep = args.slice(1).join(' ');
    var i = db.fetch(`sahip_${bot}`)
    
    
  
        var embed = new Discord.RichEmbed()
            .setTimestamp()
            .addField("Eylem:", "Sertifika Başvuru Ret")
            .addField("Reddeden Kullanıcı:", message.author.tag)
            .addField("Sebep" , sebep)
            .addField("Redddilen Bot Sahibi", client.users.get(i))
            .addField('Reddedilen Bot',client.users.get(bot))
            .setColor('RED')
           
        client.users.get(i).send(":x: | " + client.users.get(bot).tag + " adlı botunuzun sertifika isteği kabul edilmedi! Sebep: " + sebep)
        client.channels.get('553542376887681025').send(embed);
        message.reply("Ret Mesajı Gönderildi.");
    
    }


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 6
};

exports.help = {
  name: 'sertifika-ret',
  description: 'JavaScript Rolü alırsın',
  usage: 'js'
};
