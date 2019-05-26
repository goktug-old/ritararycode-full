const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  
  
    let id;
    
    if (message.mentions.users.first()) {
      id = message.mentions.users.first().id;
    } else {
        id = args[0];
    }
  
  
  if(!id) return message.channel.send("**Hata:** Lütfen Bir Bot Etiketle veya bir bot idsi gir!")
  
  db.fetch(`sahip_${id}`).then(i => {
    
    if(!i) return message.channel.send(new Discord.RichEmbed()
                                       .setColor('RANDOM')
                                       .setFooter(`${message.author.tag} tarafından istendi`)
                                       .addField(':x: | Bu Botun Sahibi Sistemde Görünmüyor!','Lütfen Yetkililere Bildirin!'))
     
  let botadı = client.users.get(id).tag
  
  message.channel.send(new Discord.RichEmbed()
                       .setDescription(`\n\n**${botadı}** adlı botun sahibi : **<@${i}>**`)
                       .setColor('RANDOM')
                       .setFooter(`${message.author.tag} tarafından istendi`))
  .catch(err => {
    message.channel.send(err)
  })
})}

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
