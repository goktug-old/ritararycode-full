const Discord = require('discord.js')
const db = require("quick.db")

exports.run = async (client, message, args) => {

message.guild.members.forEach(function(yarrak) {
 if(!yarrak.user.bot) return; 
 else {
  var sahip = db.fetch(`sahip_${yarrak.user.id}`)
  var bottanimli = db.fetch(`botlar_${sahip}`)
  if(bottanimli) return;
    if(!sahip) return;
    else {
     db.push(`botlar_${sahip}`,`${yarrak.user.id}`)
    }
 }

 })

message.reply('Ok')
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 6
};
   
exports.help = {
    name: 'sahiptanımla',
    description: 'İstediğiniz bir kişi ile düello atarsınız!',
    usage: 'düello <@kullanıcı>'
  };