const Discord = require('discord.js')

exports.run = (client, msg, args) => {
 msg.channel.send(new Discord.RichEmbed()
                  .addField("rc!sertifikabilgi","Sertifika Hakkında Bilgi Alırsınız")
                  .addField("rc!botlar @Kişi","Kullanıcının Sunucudaki botlarını görürsünüz")
                  .addField("rc!sahip @bot","Botun Sahibini Bulursunuz")
                  .addBlankField()
                  .addField("Sitemize Gitmek İçin","[TIKLA](https://www.ritararycode.tk)")
                 )
}
  
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Genel yardım komutudur.',
  usage: 'yardım'
};