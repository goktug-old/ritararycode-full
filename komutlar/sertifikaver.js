const Discord = require('discord.js');
const db = require('quick.db')

exports.run = function(client, message, args) {
  
  let guild = client.guilds.get('530744872328626197')
  
  let bot;
    if (message.mentions.users.first()) {
      bot = message.mentions.users.first().id;
    } else {
        bot = args[0];
    }
  
  db.set(`sertifika_${bot}`, "aktif")
  
    var i = db.fetch(`sahip_${bot}`)
    
    
    if (!bot) return message.reply("Kabul Kişiyi Belirtmelisin. Örnek Kullanım : `rc!bot-ret <bot-id>`");
  
        var embed = new Discord.RichEmbed()
            .setTimestamp()
            .addField("Eylem:", "Sertifika Başvuru Kabul")
            .addField("Kabul Eden Kullanıcı:", message.author.tag)
            .addField("Kabul Edilen Bot Sahibi", client.users.get(i))
            .addField('Kabul Edilen Bot',client.users.get(bot))
            .setColor('GREEN')
        
        client.users.get(i).send(":tada: | " + client.users.get(bot).tag + " adlı botunuza sertifika verildi!")
           
        guild.members.get(bot).addRole('554262078777589791') // Sertifikalı Bot
        guild.members.get(i).addRole('554275630707900427') //Sertifikalı Geliştirici
        client.channels.get('553542376887681025').send(embed);
        message.reply("Kabul Mesajı Gönderildi.");
    
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sertifikakabul","sertifikaver"], 
  permLevel: 6
};

exports.help = {
  name: 'sertifika-ver', 
  description: "bot hakkındaki önerilerinizi bot sahiplerine ulaştırır", 
  usage: 'bot-ekle <mesaj>' 
};