const Discord = require('discord.js')
const db = require("quick.db")


exports.run = async (client, message, args) => {
var bot;
if(message.mentions.users.first()) bot = message.mentions.users.first().id
else bot = args[0]

if(!client.users.get(bot).bot) return message.channel.send(":x: | Bir Bot Etiketlemelesin!")

var sahipid = db.fetch(`sahip_${bot}`)
var prefix = db.fetch(`prefix_${bot}`)
var aciklama = db.fetch(`açıklama_${bot}`)
var dil = db.fetch(`dil_${bot}`)
var ssay = db.fetch(`botlar_${bot}.sunucusayi`)
if(!ssay) ssay = "Modül bulunamadı"
if(!aciklama) aciklama = "Ayarlanmamış"
if(!dil) dil = "Ayarlanmamış"
if(!prefix) prefix = "Ayarlanmamış Lütfen Bir Yetkiliye Bildirin"
message.channel.send(new Discord.RichEmbed()
    .addField('Sahip:', "**" + client.users.get(sahipid).tag + "**")
    .addField('Prefix:', "**" + prefix + "**")
    .addField('Sunucu Sayısı:', "**" + ssay + "**")
    .addField('Açıklama:', "**" + aciklama + "**")
    .addField('Dil:', "**" + dil + "**")
    .addField("Bot Sayfasına Ulaşmak İçin: ", "[TIKLA](https://www.ritararycode.tk/bot/" + bot + ")")
    .setColor('RANDOM')
    .setThumbnail(client.users.get(bot).avatarURL)
    )

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bb'],
    permLevel: 0
};
   
exports.help = {
    name: 'bot',
    category: "eğlence",
    description: 'İstediğiniz bir kişi ile düello atarsınız!',
    usage: 'düello <@kullanıcı>'
  };