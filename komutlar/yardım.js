const Discord = require('discord.js')

exports.run = (client, msg, args) => {
 msg.channel.send(new Discord.RichEmbed()
                  .addField('rc!ekle <botid> <prefix> <kütüphane> <açıklama>','Sistemimize Bot Gönderirsiniz')
                  .addField("rc!sertifikabilgi","Sertifika Programımız Hakkında Bilgi Alırsınız")
                  .addField("rc!botlar @Kişi","Kullanıcının Sunucudaki botlarını görürsünüz")
                  .addField("rc!sahip @bot","Botun Sahibini Bulursunuz")
                  .addBlankField()
                  .addField("Sitemize Gitmek İçin","[TIKLA](https://www.ritararycode.cf)")
                  .setColor('#FFFFFF')
                  .setTitle('Ritatary Code Yardım')
                  .setFooter(msg.author.username + ' tarafından istendi.')
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