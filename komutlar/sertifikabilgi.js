const Discord = require('discord.js')

exports.run = (client, msg, args) => {
 msg.channel.send('**rc!sertifika-başvuru - ** Sisteme Sertifika Başvurusu Gönderirsiniz\n**Sertifika Almak İçin; **\nBotunuzun +100 sunucusu Olmalı ve Ritarary Code Apiyi kullanıyor olması gerekmektedir!')
}
  
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sertifikabilgi',
  description: 'Genel yardım komutudur.',
  usage: 'yardım'
};