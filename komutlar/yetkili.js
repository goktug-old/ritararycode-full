const Discord = require("discord.js");
const db = require('quick.db');

//args 0 sustur,susturaç,at,yasakla

exports.run = async (client, message, args) => {
const log = message.guild.channels.find(x => x.name === "rc-kayıtlar")
var sebep =  message.content.split('>')
if(!args[0]) return message.channel.send(`:x: | Ne Lazım Abbime!\nSeç Beğen Al!: sustur/susturaç/yasakla/at`)

if(args[0] === "yasakla") {
const user = message.mentions.users.first()  

if(user.hasPermission("BAN_MEMBERS")) return message.chanel.send("Yarrak Kafalı Neden Yetkiliye karışma!")

//if(!user) return message.channel.send("Düzgün Gir Şu Kodu Mal!\nrc!yetkili yasakla <kişi> <sebep>")
if(!reason) return message.channel.send("Düzgün Gir Şu Kodu Mal!\nrc!yetkili yasakla <kişi> <sebep>")
    log.send(`${message.author.tag} adlı kullanıcı tarafından ${user.tag} adlı kullanıcı ${sebep} sebebi ile yasaklandı!`)
    message.guild.ban(user,{ days: 7, reason: reason + " | " + message.author.tag}) 
  
} if(args[0] === "at") {
const user = message.mentions.users.first()  
  
//    if(user.member.hasPermission("BAN_MEMBERS")) return message.chanel.send("Yarrak Kafalı Neden Yetkiliyi Atıyon!")
    if(!user) return message.channel.send("Düzgün Gir Şu Kodu Mal!\nrc!yetkili at <kişi> <sebep>")
    if(!reason) return message.channel.send("Düzgün Gir Şu Kodu Mal!\nrc!yetkili at <kişi> <sebep>")
    log.send(`${message.author.tag} adlı kullanıcı tarafından ${user.tag} adlı kullanıcı ${sebep} sebebi ile atıldı!`)
    message.guild.kick(user, { days: 7, reason: reason + " | " + message.author.tag})
if(user.bot) {
db.fetch(`sahip_${user.id}`).then(sahip => {
    client.users.get(sahip).send(`${user.tag} adlı botun ${sebep} sebebi ile atıldı!`)
    message.guild.channels.find(x => x.name === "kayıtlar").send(`${user.tag} adlı bot ${sebep} sebebi ile atıldı! [<@${sahip}>]`)    
    log.send(`${message.author.tag} tarafından ${user.tag} adlı bot ${sebep} sebebi ile atıldı!`)    
    message.guild.kick(user,{reason: `${reason} || ${message.author.tag}`})
})}
} if(args[0] === "sustur") {
const user = message.mentions.users.first()  
    var reason = args.slice(2).join(" ")
    //if(user.hasPermission("BAN_MEMBERS")) return message.chanel.send("Yarrak Kafalı Neden Yetkiliyi Susturuyon!")
    log.send(`${message.author.tag} adlı kullanıcı tarafından ${user.tag} adlı kullanıcı ${sebep} sebebi ile susturuldu!`)    
    user.send(`${message.guild.name} sunucumuzda ${sebep} sebebi ile susturuldun!`)    
    message.guild.members.get(user.id).addRole(message.guild.roles.find(x => x.name === "GamerBOT | Susturma").id, sebep + " | " + message.author.tag)
} if(args[0] === "susturaç") {
const user = message.mentions.users.first()  
    log.send(`${message.author.tag} adlı kullanıcı tarafından ${user.tag} adlı kullanıcının susturması kaldırıldı!!`)    
    user.send(`${message.guild.name} sunucumuzdaki susturman kaldırıldı!!`)    
    message.guild.members.get(user.id).removeRole(message.guild.roles.find(x => x.name === "GamerBOT | Susturma").id, sebep + " | " + message.author.tag)
}
}

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["admin"],
 permLevel: 6
};

exports.help = {
 name: 'yetkili',
 description: '',
 usage: ''
};