const Discord = require('discord.js')
const db = require("quick.db")

exports.run = async (client, message, args) => {
  
  let bot;
    
    if (message.mentions.users.first()) {
      if(!message.mentions.users.first().bot) {
      bot = message.mentions.users.first().id;
    }} else {
      if(isNaN(args[0])) return message.channel.send(':warning: | Bir ID Girmeli yada bot etiketlemelisin!')
      bot = args[0];
    }
  var member = bot
if(!bot) return message.channel.send(':warning: | Bir ID Girmeli yada kullanıcı etiketlemelisin!')  
var bots = db.fetch(`botlar_${member}`)
if(!bots) return message.channel.send("**Hata:** Bu Kullanıcının Sistemde Hiçbir Botu Yok!")
var annn = bots.join('>,<@')
  message.channel.send(new Discord.RichEmbed()
                      .setDescription(`**${client.users.get(member).tag}** adlı kullanıcının botları : <@${annn}>`)
                      .setColor('BLUE')
                      )
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};
   
exports.help = {
    name: 'botlar',
    description: 'İstediğiniz bir kişi ile düello atarsınız!',
    usage: 'düello <@kullanıcı>'
  };