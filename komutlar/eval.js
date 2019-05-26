const Discord = require('discord.js')
const util = require('util');
const tokenuyari = `No token good life`
const db = require('quick.db')

exports.run = async (client, message, args) => {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', 'eval komutu özel mesajlarda kullanılamaz!')
  return message.author.sendEmbed(ozelmesajuyari); }
    if(!args[0]) {
        return message.channel.send('Yapımcımsın ama eval komutunu nasıl kullanacağını bilmiyorsun?! **/eval <kod>** olmasın sakın?')
    }
    const code = args.join(' ');
    if(code.match(/(client.token)/g)) {
        const newEmbed = new Discord.RichEmbed()
            .addField('Hata çıktı;', `\`\`\`xl\n${tokenuyari}\`\`\``)
            .setColor('#ffffff');
        message.channel.send(newEmbed);
        return
    }

    function clean(text) {
        if (typeof text !== 'string')
            text = require('util').inspect(text, { depth: 0 })
        text = text
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/g, '@' + String.fromCharCode(8203))
        return text;
    };

    const evalEmbed = new Discord.RichEmbed().setColor('RANDOM')
    try {
        var evaled = clean(await eval(code));
        if(evaled.startsWith('NDc4O')) evaled = tokenuyari;
        if (evaled.constructor.name === 'Promise') evalEmbed.setDescription(`\`\`\`\n${evaled}\n\`\`\``)
        else evalEmbed.setDescription(`\`\`\`xl\n${evaled}\n\`\`\``)
        const newEmbed = new Discord.RichEmbed()
            .addField('📥 Giriş', `\`\`\`javascript\n${code}\n\`\`\``)
            .addField('📤 Çıkış', `\`\`\`xl\n${evaled}\`\`\``)
            .setColor('#ffffff')
        message.channel.send(newEmbed);
    }
    catch (err) {
        evalEmbed.addField('Hata çıktı;', `\`\`\`xl\n${err}\n\`\`\``);
        evalEmbed.setColor('#ffffff');
        message.channel.send(evalEmbed);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['evsat, kod'], 
    permLevel: 31
}

exports.help = {
    name: 'eval',
    description: 'Yazılan kodu çalıştırır.',
    usage: 'eval'
};