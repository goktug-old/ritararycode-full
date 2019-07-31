exports.run = (client, message, args) => {

var domain = "https://simsekapi.cf/apikey/"

var asd = [
{"isim": "ataturk", "cikti": ["ataturk"],"resim": "evet", "tur": "normal", "gereklilik":"0"},
{"isim": "vur", "cikti": ["vur"],"resim": "evet", "tur": "normal", "gereklilik":"0"},
{"isim": "saril", "cikti": ["saril"],"resim": "evet",  "tur": "normal", "gereklilik":"0"},
{"isim": "espri", "cikti": ["espri"],"resim": "hayir",  "tur": "normal", "gereklilik":"0"},
{"isim": "soz", "cikti": ["soz"],"resim": "hayir",  "tur": "normal", "gereklilik":"0"},
{"isim": "renk", "cikti": ["renkkodu", "renkresmi"],"resim": "evet",  "tur": "query", "gereklilik":"2", "gereklilikisim": "renk"},
{"isim": "askolcer", "cikti": ["askseviyesi", "emoji", "dcemoji"],"resim": "hayir",  "tur": "normal", "gereklilik":"0"},
{"isim": "sifre", "cikti": ["sifre"],"resim": "hayir",  "tur": "normal", "gereklilik":"1", "gereklilikisim": "uzunluk"},
{"isim": "saat", "cikti": ["bolge","zamandilimi","tamtarih","hafta","gun","ay","yil","gunyazilisi","saat","dakika","saniye"],"resim": "hayir",  "tur": "normal", "gereklilik":"0"},
{"isim": "kedi", "cikti": ["kedi"],"resim": "evet",  "tur": "normal", "gereklilik":"0"},
{"isim": "kopek", "cikti": ["kopek"],"resim": "evet",  "tur": "normal", "gereklilik":"0"},
{"isim": "romen", "cikti": ["romen"],"resim": "hayir",  "tur": "normal", "gereklilik":"1", "gereklilikisim": "sayı"},
{"isim": "hava", "cikti": ["sehir","enlem","boylam","sicaklikd","sicaklikf","enyukseksicaklikd","enyukseksicaklikf","endusuksicaklikd","endusuksicaklikf","havaolayi","bulutorani","nem","basinc","ruzgaryonu","ruzgarhizi","gundogumu","gunbatimi"],"resim": "hayir",  "tur": "normal", "gereklilik":"1", "gereklilikisim": "sehir"},
{"isim": "secim", "cikti": ["Ad","Kod","Buyuksehir","Sandik"],"resim": "hayir",  "tur": "normal", "gereklilik":"1", "gereklilikisim":"Şehir"},
{"isim": "vikipedi", "cikti": ["kelime","bilgi","link"],"resim": "hayir",  "tur": "normal", "gereklilik":"1", "gereklilikisim": "Kelime"},
{"isim": "namaz", "cikti": ["il","imsak","gunes","ogle","ikindi","aksam","yatsi"],"resim": "hayir",  "tur": "normal", "gereklilik":"1", "gereklilikisim": "Kelime"},
{"isim": "giphy", "cikti": ["gifresim"],"resim": "evet",  "tur": "normal", "gereklilik":"1", "gereklilikisim": "gifismi"},
{"isim": "twitch", "cikti": ["kullaniciadi","gorunenisim","biyografi","kanallogo","kanalurl","olusturma","guncelleme","yayinbasligi","yayintoplamizlenme","yayinoyun","yayinsuanizlenme"],"resim": "hayir",  "tur": "normal", "gereklilik":"1", "gereklilikisim": "kullanici"},
]

var tüm = []

asd.forEach(a => {
tüm.push(a.isim)
})

if(!args[0]) return message.channel.send("Şu anda uyarlanabilen apiler\n**" + tüm.join(' , ') + '**')

var bilgiler,gereklilikisim, embed,resimm,doma;

asd.forEach(a => {
  if(a.isim === args[0]) {
  console.log(a.isim + args[0])
  var isim = a.isim
  var resim;
  var cikti = a.cikti.toString()
  if(a.resim === "evet") resim = "aktif"
  else resim = null
  var tur = a.tur
  var gereklilik = a.gereklilik
  if(gereklilik === "0") gereklilikisim = null
  else gereklilikisim = a.gereklilikisim
  
  bilgiler = {
    "isim": isim,
    "resim": resim,
    "cikti": cikti,
    "tur": tur,
    "gereklilik": gereklilik,
    "gereklilikisim": gereklilikisim
  }}
})

if(bilgiler.resim) resimm = bilgiler.cikti[0]
else resimm = bilgiler.cikti.toString()

if(resimm.length === "1") embed = `new Discord.RichEmbed().setImage('${resimm}').setDescription('Veriler [https://simsekapi.cf](https://simsekapi.cf) sitesinden çekilmektedir. Siteye erişim sağlamak için [bot destek sunucusundan](https://simsek.cf/destek) api key almalısınız.')`
else embed = `new Discord.RichEmbed().setDescription('${resimm} Veriler [https://simsekapi.cf](https://simsekapi.cf) sitesinden çekilmektedir. Siteye erişim sağlamak için [bot destek sunucusundan](https://simsek.cf/destek) api key almalısınız.')`

if(!bilgiler.gereklilikisim) doma = domain + bilgiler.isim
else {
if(bilgiler.tur = "normal") {
   doma = domain + bilgiler.isim +"/"+ bilgiler.gereklilikisim
} else doma = domain + bilgiler.isim +"?"+ bilgiler.gereklilikisim + "=${encodeURIComponent(args[0])}" 
}

require('hastebin-gen')(`const Discord = require('discord.js');
var request = require('request');

exports.run = function(client, message, args) {
   request('${doma}', function (error, response, body) {
    if (error) return message.channel.send('Hata:', error);
    else if (!error) {
    var genel = JSON.parse(body);
     if(genel.hata) return message.channel.send('Api Hatası!')
  message.channel.send(${embed});
} 
});
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: '${bilgiler.isim}',
  description: 'RitararyCode', 
  usage: '${bilgiler.isim}'
};`, { url: "https://hasteb.in", extension: "js" }).then(r => {
console.log("Mal oç")
message.channel.send(':postbox: | DM Kutunu Kontrol Et!')
message.author.send(bilgiler.isim + " adlı api kod: " + r)
message.guild.channels.find(t => t.name === "site-logs").send(message.author.tag + " adlı kullanıcı " + bilgiler.isim + ' adlı **simsekapi** kodunu aldı!')

}).catch(e => { if(e) return message.channel.send('Hastebin Hatası. Daha sonra tekrar deneyiniz')})

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'apikod',
    description: 'Simsek Apilerini Komuta çevirir',
    usage: 'apikod api'
};