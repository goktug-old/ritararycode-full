const Discord = require('discord.js')
const db = require("quick.db")

exports.run = async (client, message, args) => {

var bott = message.mentions.users.first()
if(!bott) return message.channel.send(":x: | Bir Bot Etiketle!")
if(!bott.bot) return message.channel.send(":x: | Bir Bot Etiketle!")
var bot = bott.id
db.fetch(`sahip_${bot}`).then(sahip => {
if(message.author.id !== sahip && message.author.id !== "495825025207894016") return message.channel.send(":x: | Bu Komutu Sadece Botun Sahibi Kullanabilir. Bot Sahibi: " + client.users.get(sahip).tag )
else {
  if(!args[1]) return message.channel.send(":x: | Lütfen Ne Yapacağını Belirt!\nYapabileceklerin: açıklama,dil")
  else if(args[1] === "açıklama") {
    var açıklama = args.slice(2).join(" ")
    if(!açıklama) return message.channel.send("Lütfen Bir Açıklama Girin")
   db.set(`açıklama_${bot}`, `${açıklama}`) 
    message.channel.send(`**${bott.tag}** adlı botun site açıklaması artık **${açıklama}**`)
  } else if(args[1] === "dil") {
    var açıklama = args[2]
    if(!açıklama) return message.channel.send("Lütfen Bir Açıklama Girin")
   db.set(`dil_${bot}`, `${açıklama}`) 
    message.channel.send(`**${bott.tag}** adlı botun kodlama dili artık **${açıklama}**`)
  }else if(args[1] === "token") {
var token = require('generate-password').generate({
uppercase: true,
length: 15,
numbers: true
})
    db.set(`token_${token}`, `${bot}`) 
    message.author.send(`**${bott.tag}** adlı botun tokeni: ${token} `)
    message.channel.send(`**${bott.tag}** adlı botun api tokeni DM Kutunda!**`)
  } else if(args[1] === "sertifika") {
    if(message.author.id !== "495825025207894016") return;
    var açıklama = args[2]
    if(!açıklama) return message.channel.send("Lütfen Bir Açıklama Girin")
   db.set(`sertifika_${bot}`, `${açıklama}`) 
    message.channel.send(`**${bott.tag}** adlı botun sertifika durumu **${açıklama}**`)
  } else if(args[1] === "prefix") {
    var açıklama = args[2]
    if(!açıklama) return message.channel.send("Lütfen Bir Açıklama Girin")
   db.set(`prefix_${bot}`, `${açıklama}`) 
    message.channel.send(`**${bott.tag}** adlı botun prefixi **${açıklama}**`)
  }
  
  else if(args[1] !== "dil" && args[1] !== "açıklama" && args[1] !== "sertifika" && args[1] !== "prefix" ) return message.channel.send(":x: | Lütfen Ne Yapacağını Belirt!\nYapabileceklerin: açıklama,dil")
}
})}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['düzenle'],
    permLevel: 0
};
   
exports.help = {
    name: 'ayarlar',
    description: 'İstediğiniz bir kişi ile düello atarsınız!',
    usage: 'düello <@kullanıcı>'
  };