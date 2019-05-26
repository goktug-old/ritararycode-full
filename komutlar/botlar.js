const Discord = require('discord.js')
const db = require("quick.db")

exports.run = async (client, message, args) => {


  
var member = message.mentions.users.first().id
if(!member) return message.channel.send(':x: | Bir Kullanıcı Etiketlemelisin')
if(client.users.get(member).bot) return message.reply(':x: | **Normal** Bir kullanıcı etiketlemelisin')
db.fetch(`botlar_${member}`).then(bots => {
if(!bots) return message.channel.send("**Hata:** Bu Kullanıcının Sistemde Hiçbir Botu Yok!")
var annn = bots.join('>,<@')
  message.channel.send(new Discord.RichEmbed()
                      .setDescription(`**${client.users.get(member).tag}** adlı kullanıcının botları : <@${annn}>`)
                      .setColor('BLUE')
                      .setFooter(`Ritarary Code`))
  
})
  
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