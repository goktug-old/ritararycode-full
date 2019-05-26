const Discord = require('discord.js')
const db = require("quick.db")


exports.run = async (client, message, args) => {
var bot;
if(message.mentions.users.first()) bot = message.mentions.users.first().id
else bot = args[0]

if(!client.users.get(bot).bot) return message.channel.send(":x: | Bir Bot Etiketlemelesin!")

db.fetch(`sahip_${bot}`).then(sahipid => {
db.fetch(`prefix_${bot}`).then(prefix => {
db.fetch(`açıklama_${bot}`).then(aciklama => {
db.fetch(`dil_${bot}`).then(dil => {
if(!aciklama) aciklama = "Ayarlanmamış"
if(!dil) dil = "Ayarlanmamış"
if(!prefix) prefix = "Ayarlanmamış Lütfen Bir Yetkiliye Bildirin"
message.channel.send(new Discord.RichEmbed()
    .addField('Sahip:', "**" + client.users.get(sahipid).tag + "**")
    .addField('Prefix:', "**" + prefix + "**")
    .addField('Açıklama:', "**" + aciklama + "**")
    .addField('Dil:', "**" + dil + "**")
    .addField("Bot Sayfasına Ulaşmak İçin: ", "[TIKLA](https://www.ritararycode.cf/bot/" + bot + ")")
    .setColor('RANDOM')
    .setThumbnail(client.users.get(bot).avatarURL)
    )

})})})})}

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