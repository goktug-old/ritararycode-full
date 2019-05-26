const Discord = require('discord.js');
const db = require('quick.db')

exports.run = function(client, message, args) {
  
    var sebep = args.slice(1).join(' ');
    
      var bot;
    
    if (message.mentions.users.first()) {
      bot = message.mentions.users.first().id;
    } else {
        bot = args[0];
    }
      
    db.fetch(`sahip_${bot}`).then(i => {
    if (!bot) return message.reply("Reddedilecek Kişiyi Belirtmelisin. Örnek Kullanım : `rc!bot-ret <bot-id>`");
    else if (!sebep) return message.reply('Bir Sebep Girmelisin')
  
        var embed = new Discord.RichEmbed()
            .setTimestamp()
            .addField("Eylem:", "Başvuru Ret")
            .addField("Reddeden Kullanıcı:", message.author.tag)
            .addField("Sebep" , sebep)
            .addField("Redddilen Bot Sahibi", client.users.get(i))
            .addField('Reddedilen Bot',client.users.get(bot))
            .setColor('RED')
           
        client.users.get(i).send(":x: | " + client.users.get(bot) + " adlı botunuz kabul edilmedi! Sebebi: "+ sebep)
        client.channels.get('553542376887681025').send(embed);
        message.reply("Ret Mesajı Gönderildi.");
    
    })}

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
