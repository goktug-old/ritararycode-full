const Discord = require('discord.js')
const db = require("quick.db")

exports.run = async (client, message, args) => {

message.guild.members.forEach(function(yarrak) {
 if(yarrak.user.bot) return; 
 else {
  db.delete(`botlar_${yarrak.user.id}`)
}
})
message.channel.send('oldu')
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 6
};
   
exports.help = {
    name: 'sahiptemizle',
    description: 'İstediğiniz bir kişi ile düello atarsınız!',
    usage: 'düello <@kullanıcı>'
  };