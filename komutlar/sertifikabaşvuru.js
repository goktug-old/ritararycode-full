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
  var sahip = db.fetch('sahip_' + bot)
  if(message.author.id !== sahip) return message.channel.send(":x: | Bu Komutu Sadece Bot Sahibi ( " + client.users.get(sahip).tag + " ) kullanabilir")
  else if (!args[1]) return message.channel.send(':x: | Lütfen Bir Prefix Giriniz!')
  
  
  let botgeldikanal = client.channels.get('534741593500942336')
  
  message.channel.send(':white_check_mark: | Sertifika Isteminiz Sisteme Gönderildi!')
  
  botgeldikanal.send(new Discord.RichEmbed()
                     .setDescription(`Bir Bot sertifika istiyor!\n**Sahip: ** ${message.author.tag}(${message.author.id})\n**ID: **${args[0]}\n**Prefix:** ${args[1]}\nhttps://discordapp.com/oauth2/authorize?client_id=${args[0]}&scope=bot&permissions=8`)
                    )
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sertifika-başvuru',
  description: 'JavaScript Rolü alırsın',
  usage: 'js'
};
