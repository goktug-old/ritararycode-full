const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db')

var prefix = 'g!';

module.exports = (client,message) => {
  client.user.setActivity('#ekle kanalını')
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${client.user.username} ismi ile giriş yapıldı.`);
};