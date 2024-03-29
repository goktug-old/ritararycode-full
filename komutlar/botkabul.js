const Discord = require('discord.js');
const db = require('quick.db')

exports.run = function(client, message, args) {
  
  let bot;
    
    if (message.mentions.users.first()) {
      bot = message.mentions.users.first().id;
    } else {
      if(isNaN(args[0])) return message.channel.send(":x: | Id rakam olmalıır")
        bot = args[0];
    }
  // || message.mentions.users.first().id
  
    var i = db.fetch(`sahip_${bot}`)
    
      let sunucu = client.guilds.get('530744872328626197')
      let rolid = '554275625716678657'
    
    if (!bot) return message.reply("Kabul Kişiyi Belirtmelisin. Örnek Kullanım : `rc!kabul <bot-id> veya botu etiketle`");
  try {
        var embed = new Discord.RichEmbed()
            .setTimestamp()
            .addField("Eylem:", "Başvuru Kabul")
            .addField("Kabul Eden Yetkili:", message.author.tag)
            .addField("Kabul Edilen Bot Sahibi", client.users.get(i).tag)
            .addField('Kabul Edilen Bot',client.users.get(bot).tag)
            .addField('Botun Davet Linki',`https://discordapp.com/oauth2/authorize?client_id=${bot}&scope=bot&permissions=-1`)
            .setColor('GREEN')
        client.users.get(i).send(":tada: | " + client.users.get(bot).tag + " adlı botunuz onaylandı!").catch(e => message.channel.send(e))
        client.channels.get('553542376887681025').send(embed);
        message.reply("Kabul Mesajı Gönderildi.\nhttps://discordapp.com/oauth2/authorize?client_id="+ bot + "&scope=bot&permissions=0");
    
        sunucu.members.get(i).addRole(rolid)
    } catch(e) {
      message.channel.send(e)
    }
    }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["kabul-et","kabulet"], 
  permLevel: 6 
};

exports.help = {
  name: 'kabul', 
  description: "bot hakkındaki önerilerinizi bot sahiplerine ulaştırır", 
  usage: 'bot-ekle <mesaj>' 
};