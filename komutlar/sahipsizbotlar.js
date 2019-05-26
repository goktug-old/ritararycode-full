const Discord = require('discord.js');
const db = require('quick.db')

exports.run = function(client, message, args) {
  
message.guild.members.forEach(function(am) {
if(!am.user.bot) return;
if(am.user.id === "551841231961849878" || am.user.id === "473284664711446529" || am.user.id === "540902460747677716" || am.user.id === "518145591860264961" || am.user.id === "540978976617660416" || am.user.id === "436527843959111681" || am.user.id === "351611743018942464" || am.user.id === "294882584201003009" || am.user.id === "548149568681017367" || am.user.id === "172002275412279296" || am.user.id === "275813801792634880" || am.user.id === "422087909634736160" || am.user.id === "500297618505859072" || am.user.id === "527858318786691092" || am.user.id === "409875566800404480") return;
db.fetch(`sahip_${am.user.id}`).then(ptts => {
var çek = message.guild.members.get(ptts)
if(!çek) return message.channel.send("<@" + am.user.id + ">")
if(!am || am<0) return message.reply('Sahipsiz Bot Yok')
})
})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sahipsizler'],
  permLevel: 6
};

exports.help = {
  name: 'sahipsiz',
  description: 'JavaScript Rolü alırsın',
  usage: 'js'
};
