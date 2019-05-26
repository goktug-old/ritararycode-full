const Discord = require('discord.js')
const db = require("quick.db")

exports.run = async(client,message,args) => {

var sayı = ["0","1","2","3","4","5","6","7","8","9"]

var id = args[0]
if(!id) return message.channel.send(":x: | rc!ekle <id> <prefix> <kütüphane> - <açıklama>")
var prefix = args[1]
if(!prefix) return message.channel.send(":x: | rc!ekle " + id + " <prefix> <kütüphane> - <açıklama>")
var kütüphane = args[2]
if(!kütüphane) return message.channel.send(":x: | rc!ekle " + id + " " + prefix +" <kütüphane> -  <açıklama>")
  let messageArray = message.content.split("-");
  let argss = messageArray.slice(1);
var açıklama = argss[0]
if(!açıklama) return message.channel.send(":x: | rc!ekle " + id + " " + prefix +" " + kütüphane + " - <açıklama>")


if(!sayı.some(word => message.content.includes(word))) return message.channel.send(":x: | rc!ekle <id> - <prefix>")

var varmı;
if(message.guild.members.get(id)) varmı = "var"
else varmı = "yok"

if(varmı === "var") return message.channel.send(":x: | Bot Zaten Sunucuda!")

db.set(`sahip_${id}`, `${message.author.id}`)
db.set(`prefix_${id}`, `${prefix}`)
db.push(`botlar_${message.author.id}`, `${id}`)
db.set(`dil_${id}`, `${kütüphane}`)
db.set(`açıklama_${id}`, `${açıklama}`)

message.channel.send(`:white_check_mark: | ${id} id'li botun onay sırasına girdi!`)
message.author.send(`${id} id'li botun sisteme gönderildi! Yakın Zamanda Kontrol Edilip Kabul Edilirse Sunucuya Alınacaktır!\n<#553542376887681025> kanalını kontrol etmeyi unutmayın!`)

var çen = client.channels.get("530756322040479754")

çen.send(new Discord.RichEmbed()
.setColor("RANDOM")
.addField("Yeni Bot Gönderildi!", "[ID: " + id + "](https://discordapp.com/oauth2/authorize?client_id=" + id + "&scope=bot&permissions=8)")
.addBlankField()
.addField('Prefix:',prefix))
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["ekle"],
    permLevel: 0
};
  
exports.help = {
    name: 'bot-eklet',
    description: 'Seçtiğiniz İşte Çalışırsınız',
    usage: 'çalış'
  };