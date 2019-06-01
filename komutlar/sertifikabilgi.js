const Discord = require('discord.js')

exports.run = (client, msg, args) => {
 msg.channel.send(new Discord.RichEmbed()
                  .setDescription('**rc!sertifika-başvuru - ** Sisteme Sertifika Başvurusu Gönderirsiniz\n**Sertifika Almak İçin; **\nBotunuzun +100 sunucusu Olmalı ve 2 Gün aktif olması gereklidir.\nBilgiler Her An Değiştirilebilir Başvuru Yapmadan Tekrar Okuyunuz!')
                  .setColor('#FFFFFF')
                  .setTitle('Ritatary Code Sertifika Yardım')
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
  name: 'sertifikabilgi',
  description: 'Genel yardım komutudur.',
  usage: 'yardım'
};