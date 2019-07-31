const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

  let bot;
    if (message.mentions.users.first()) {
      if(message.mentions.users.first().bot) {
      bot = message.mentions.users.first().id;
    }} else {
      if(isNaN(args[0])) return message.channel.send(':warning: | Bir ID Girmeli yada bot etiketlemelisin!')
      bot = args[0];
    }
if(!bot) return message.channel.send(':warning: | Bir ID Girmeli yada bot etiketlemelisin!')  
var id = bot

  var i = db.fetch(`sahip_${id}`)
    
    if(!i) return message.channel.send(':x: | Bu Botun Sahibi Sistemde Görünmüyor!')
     
  let botadı = client.users.get(id).tag
  
  message.channel.send(new Discord.RichEmbed()
                       .setDescription(`\n\n**${botadı}** adlı botun sahibi : **<@${i}>**`)
                       .setColor('RANDOM')
                       .setFooter(`${message.author.tag} tarafından istendi`))
  .catch(err => {
    message.channel.send(err)
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sahip',
  description: 'JavaScript Rolü alırsın',
  usage: 'js'
};
