const Discord = require('discord.js')
const tokenuyari = `Ben tokene Karşıyım`
var exec = require('child-process-promise').exec;

exports.run = async (client, message, args) => {

    if(!args[0]) return message.reply('g!ex kod')


exec(args.join(" "))
    .then(function (result) {
        var stdout = result.stdout;
        var stderr = result.stderr;
        message.channel.send(new Discord.RichEmbed()
                             .addField('Girdi', `${args.join( " " )}`)
                             .addField('Çıktı', stdout)
                             .setColor('ORANGE')
                             )
    })
    .catch(function (err) {
        message.channel.send(new Discord.RichEmbed()
                             .addField('Hata', err)
                             .setColor('ORANGE')
                             )
    });
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 4
}

exports.help = {
    name: 'ex',
    description: 'Ritarary Code Sunucusuna Aittir.',
    usage: ""
}