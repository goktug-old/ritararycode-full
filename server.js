
var karaliste = ["485741578615521291"]

const http = require('http');
const express = require('express');
const app = express();
var request = require('request');
const db = require('quick.db')

app.use(express.static('public'));    

const Discord = require('discord.js')
const client = new Discord.Client()
const useful = require('useful-tools');
//client.login("NTMxMDE4ODYzODgyNzk3MDU2.XOLsfQ.0Va4QhyhnbC2Ta7izuTGImV5xFY")
//client.login("NTMxMDE4ODYzODgyNzk3MDU2.XOLszA.pZ6SzIE6kEjr3zNqIKHq1wIN6-k")
client.login("NTMxMDE4ODYzODgyNzk3MDU2.XORRJQ.skLIuH9KXrwWRVFAgkUxZdkXxhc")
client.ayar = db
client.useful = useful;


client.yetkililer = ["312927505252089866","491231235801088000","384385666345336832","495825025207894016","521557165542998016"] 
client.sunucuyetkililer = client.yetkililer
client.webyetkililer = client.yetkililer

app.listen(process.env.PORT)

const url = require("url");

client.on('ready', () => {
 // require('./util/eventLoader.js')(client)
  require('./bot.js')(client)
})

const moment = require("moment");
require("moment-duration-format");
const path = require('path')
const passport = require("passport");
const session = require("express-session");
const LevelStore = require("level-session-store")(session);
const Strategy = require("passport-discord").Strategy;

const helmet = require("helmet");

const md = require("marked");

const templateDir = path.resolve(`${process.cwd()}${path.sep}site`);

app.use("/css", express.static(path.resolve(`${templateDir}${path.sep}css`)));

passport.serializeUser((user, done) => {
done(null, user);
});
passport.deserializeUser((obj, done) => {
done(null, obj);
});

passport.use(new Strategy({
clientID: "531018863882797056",
clientSecret: "vnSdAXDyrVgIWZ-do4ryNxViI_9hlyEF",
callbackURL: "https://ritararycode.cf/callback",
scope: ["identify"]
},
(accessToken, refreshToken, profile, done) => {
process.nextTick(() => done(null, profile));
}));

app.use(session({
secret: '123',
resave: false,
saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());

app.locals.domain = process.env.PROJECT_DOMAIN;

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
extended: true
})); 

function checkAuth(req, res, next) {
if (req.isAuthenticated()) { 
if(!client.guilds.get("530744872328626197").members.get(req.user.id)) return res.send('Selam. Sanırım Sunucumda Yoksun. Bu Kodu Kullanman İçin Sunucuma Gelmelisin. Gelmen için <a href="https://www.discord.gg/8CqPzjp">BANA</a> Tıkla')
return next();
}
req.session.backURL = req.url;
res.redirect("/giris");
}

const renderTemplate = (res, req, template, data = {}) => {
const baseData = {
bot: client,
path: req.path,
db: db,
user: req.isAuthenticated() ? req.user : null
};
res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
};


app.get("/giris", (req, res, next) => {
if (req.session.backURL) {
req.session.backURL = req.session.backURL;
} else if (req.headers.referer) {
const parsed = url.parse(req.headers.referer);
if (parsed.hostname === app.locals.domain) {
req.session.backURL = parsed.path;
}
} else {
req.session.backURL = "/";
}
next();
},
passport.authenticate("discord"));

app.get("/baglanti-hatası", (req, res) => {
renderTemplate(res, req, "autherror.ejs");
});

app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), async (req, res) => {
if (req.session.backURL) {
const url = req.session.backURL;
req.session.backURL = null;
res.redirect(url);
} else {
res.redirect("/");
}
});

app.get("/cikis", function(req, res) {
req.session.destroy(() => {
req.logout();
res.redirect("/");
});
});

app.get('/api/cokgizli/sertifika/:id/:ap', (req,res) => {
  var id = req.params.id
  var ap = req.params.ap
  db.set('sertifika_' + id, ap)
  res.send('tm')
})

app.get("/autherror", (req,res) => {
  res.redirect("/")
})

app.get("/", (req, res) => {
renderTemplate(res, req, "anasayfa.ejs");
});

app.get("/botlar", (req, res) => {
renderTemplate(res, req, "botlar.ejs");
});

app.get('/botlar/ara/:isim', (req,res) => {
var isim = req.params.isim
if(!isim) return res.sendFile(__dirname +"/site/404.html")
renderTemplate(res, req, "botlara.ejs", {isim})
})

app.get("/kodlar", checkAuth, (req, res) => {
renderTemplate(res, req, "kodlar.ejs");
});

const kodlar = {
  "alinti":"<p><a href=\"https://turkkod.cf/~5c529b9c40b57500669021d0\">komutlar/alıntı.js</a></p>",
  "ayarlanabilirdestek":"<p><a href=\"https://turkkod.tk/~5c4e14e7e732980067d945be\">bot.js ye atılacak </a></p><p><a href=\"https://turkkod.tk/~5c4e152ce732980067d945bf\">komutlar/destekkanal.js atılacak</a></p><p><a href=\"https://turkkod.tk/~5c4e1564e732980067d945c0\">komutlar/destekrol.js atılacak</a></p>",
  "etiketprefix":`<p><a href="https://www.turkkod.cf/~5c3046bfa7bd4c00641b64c3">bot.js</a></p>`,
  "sor":`<p><a href="https://turkkod.tk/~5c4c3e37b4a2ef00673cb00d">komutlar/sor.js</a></p><h5>Çalışması için cleverbot.io dan key almalısın!</h5>`,
  "davetcikar":`<p><a href="https://www.turkkod.cf/~5cd7cc657bf95c0079e9f2b8">komutlar/davetçıkar.js</a></p>`,
  "degisenoynuyor":`<p><a href="https://turkkod.cf/~5c4325858ca41b0065194058">events/ready.js</a></p>`,
  "kaydol":`<p><a href="https://hasteb.in/ucopeqaq.js">komutlar/kayıtol.js</a></p><p><a href ="https://hasteb.in/yunigute.js">komutlar/kayıtonay.js</a></p>`,
  "dmduyuru":`<p><a href="https://turkkod.cf/~5c840b63aaba3b0063e813d5">komutlar/dmduyuru.js</a></p>`,
  "eval":`<p><a href="https://turkkod.cf/~5c43225e8ca41b0065194056">komutlar/eval.js</a></p>`,
  "karaliste":`<p><a href="https://turkkod.cf/~5c693b1559d65d0063086ee6">komutlar/karaliste.js</a></p><p><a href="https://turkkod.cf/~5c693b3e59d65d0063086ee7">komutlar/beyazliste.js</a></p><p><a href="https://turkkod.cf/~5c693ba159d65d0063086ee8">events/message.js</a></p>`,
  "kullanicibilgi":`<p><a href="https://turkkod.tk/~5c4994f9f941520065f02bf6">komutlar/kullanıcıbilgi.js</a></p>`,
  "konustur":`<p><a href="http://turkkod.cf/~5c2f882e5149a7006548bb32">komutlar/konuştur.js</a></p>`,
  "otorol":`<p><a href="https://turkkod.cf/~5c4815b60da4560065318f4d">komutlar/otorol.js</a></p><p><a href="https://turkkod.cf/~5c4815c70da4560065318f4e">bot.js</a></p><p><a href="https://turkkod.cf/~5c4816e80da4560065318f4f">komutlar/otorolkapat.js</a></p>`,
  "oyverdim":`<p><a href="https://hasteb.in/makihosa.js">komutlar/oyverdim.js</a></p>`,
  "oylama":`<p><a href="https://hasteb.in/ovihosaq.js">komutlar/oylama.js</a></p>`,
  "patatesemoji":`<p><a href="https://hasteb.in/ihubofon.cs">bot.js/server.js</a></p>`,
  "sunucukur":`<p><a href="http://turkkod.ml/~5c693bc559d65d0063086ee9">komutlar/sunucukur.js</a></p>`,
  "sunucuyagiriscikislog":`<p><a href="https://turkkod.cf/~5c45c2cd6bc2b20065e1da54">bot.js</a></p>`,
  "sunucular":`<p><a href="https://turkkod.cf/~5c693e7259d65d0063086eea">komutlar/sunucular.js</a></p>`,
  "tavsiye":`<p><a href="https://hasteb.in/savohule.js">komutlar/tavsiye.js</a></p>`,
  "ultrasohbettemizleyici":`<p><a href="https://hasteb.in/axurokav.js">bot.js/server.js</a></p><p><a href="https://hasteb.in/uvoxesoj.js">komutlar/ultrasohbettemizleyici.js</a></p>`, 
  "yenile":`<p><a href="https://hastebin.com/lakalinoba.js">komutlar/yenile.js</a></p>`,
  "snipe":`<p><a href="https://hasteb.in/iboyozov.js">bot.js</a></p> <p><a href="https://hasteb.in/kulanife.js">komutlar/snipe.js</a></p>`,
  "gozetle":`<p><a href="https://hasteb.in/iseyulab.js">komutlar/gözetle.js</a></p><p><a href="https://hasteb.in/iwobonam.js">komutlar/gözetlekapat.js</a></p><p><a href="https://hasteb.in/kefogazo.js">bot.js/server.js</a></p>`,
  "prefix-calismakanal":`<p><a href="https://turkkod.tk/~5c7d49e650ab74006269c72f">komutlar/prefixayarla.js</a></p><p><a href="https://turkkod.tk/~5c7d4a0150ab74006269c730">komutlar/çalışmakanal.js</a></p><p><a href="https://turkkod.tk/~5c7d4a3850ab74006269c731">events/message.js</a></p><p><a href="https://hasteb.in/jimutebe.js">komutlar/kapat.js</a></p>`,
  "dmlog":`<p><a href="https://www.turkkod.cf/~5c4c0cf0f958bf0068e5570e">bot.js</a></p><h5>Eğer Hata Alıyorsanız ayrı bir glitch açıp deneyin</h5>`,
  "jsrol":`<p><a href="https://turkkod.cf/~5cd7d45f7bf95c0079e9f2b9">komutlar/jsrol.js</a></p>`,
  "sureliduyuru":`<p><a href="https://hasteb.in/mudiyajo.js">bot.js/server.js</a></p><p><a href="https://hasteb.in/ikenolop.js">events/ready.js</a></p>`,
  "bot-uyeotorol":`<p><a href="https://turkkod.cf/~5c84ea14d9ce880067b289bf#L21">komutlar/otorol.js</a></p><p><a href="https://turkkod.cf/~5c84ea02d9ce880067b289be">bot.js</a></p>`,
  "basvuru":`<p><a href="https://turkkod.cf/~5c84f5e5d9ce880067b289c0">komutlar/başvur.js</a></p>`,
  "kanalkonu":`<p><a href="https://turkkod.cf/~5c850955d9ce880067b289c1">komutlar/kanalkonu.js</a></p>`,
  "sarkisozu":`<p><a href="https://turkkod.cf/~5c86ab6830b1af0067c19a80">komutlar/şarkısözü.js</a></p><h5>Komutun Çalışması İçin www.simsekapi.cf üzerinden api key almalısınız. Key Alımı İçin Turkoglu-#0850  ile görüşün</h5>`,
  "notsistem":`<p><a href="https://turkkod.cf/~5c8d35a476e4da006730c439">komutlar/notal.js</a></p><p><a href="https://turkkod.cf/~5c8d35a976e4da006730c43a">komutlar/notbilgi.js</a></p><p><a href="https://turkkod.cf/~5c8d35af76e4da006730c43b">komutlar/notlar.js</a></p><p><a href="https://turkkod.cf/~5c8d35b476e4da006730c43c">komutlar/notsil.js</a></p>`,
  "exec":`<p><a href="https://turkkod.cf/~5c8fc4adb282380062a3ff2f">komutlar/exec.js</a></p><p>Gerekli Modül <strong>child-process-promise</strong></p>`,
  "gyardim": `<p><a href="https://turkkod.cf/~5c9cfbf5d50477006779732b">komutlar/yardım.js</a></p>`,
  "hesapgen": `<p><a href="https://turkkod.cf/~5ca1b52180716e00664ebc43">komutlar/hesap.js</a></p>`,
  "yedeksistem": `<p><a href="https://glitch.com/edit/#!/yedekbotu">Tıkla Banağ </a></p>`,
}

app.get("/kodlar/:kod", checkAuth, async (req, res) => {
  if(!req.params.kod) return res.redirect("/kodlar")
  var kod = kodlar[req.params.kod]
  if(!kod) return res.sendFile(__dirname + "/site/404.html")
  var kodisim = req.params.kod
  renderTemplate(res, req, "kod.ejs", {fs, kod, kodisim})
  
  })


//lient.login("NTMxMDE4ODYzODgyNzk3MDU2.D2WbHQ.exmDW73OIlwwa39ulI9iNra9HHA")

const fs = require('fs')


app.get("/kullanici/:userID", (req, res) => {

  request({
    url: `https://discordapp.com/api/v7/users/${req.params.userID}`,
    headers: {
      "Authorization": `Bot ${process.env.TOKEN}`
    },
  }, function(error, response, body) {
    if (error) return console.log(error)
    else if (!error) {
      var kisi = JSON.parse(body)

      renderTemplate(res, req, "profil.ejs", {kisi})
    };
  });

});



app.get("/kullanici/:userID/ayarla", checkAuth, (req, res) => {

  renderTemplate(res, req, "profila.ejs")

});

app.get("/b/:id", checkAuth, (req,res) =>{
  var id = req.params.id
  if(!id) return res.redirect("/b/" + req.user.id)
  if(id !== req.user.id) return res.redirect("/")
  renderTemplate(res,req, "basvur.ejs")
})

app.post("/b/:id", checkAuth, (req,res) => {
  var id = req.params.id
  if(id !== req.user.id) return res.redirect("/")
   var isim = `${req.body["isim"]}`
 //  var dcname = `${req.body["dcname"]}`
   var bilgi =`${req.body["bilgi"]}`
var web = new Discord.WebhookClient("562159564431294495","yKcEo2vS0Y6840ft9YbnqJkteYBI_QN1SwVXMrIwZq_5kJkHc02Tx87A2NLlW5gR6Z2K")

web.send(new Discord.RichEmbed()
         .addField("Isim:", isim)
         .addField("Bilgi:",bilgi)
         .addField("Discord Kullanici adi:",client.users.get(id).tag)
         )
         

res.redirect("/")
})

app.post("/kullanici/:userID/ayarla", checkAuth, (req, res) => {

  if (req.params.userID !== req.user.id) return res.redirect('/');

  var profil = JSON.parse(fs.readFileSync('./profil.json', 'utf8'));


  request({
    url: `https://discordapp.com/api/v7/users/${req.params.userID}`,
    headers: {
      "Authorization": `Bot ${process.env.TOKEN}`
    },
  }, function(error, response, body) {
    if (error) return console.log(error)
    else if (!error) {
    var kisi = JSON.parse(body)

  var veri = JSON.parse(`{
  "isim": "${req.body['isim']}",
  "yas": "${req.body['yas']}",
  "biyo": "${req.body['biyo']}",
  "avatar": "https://cdn.discordapp.com/avatars/${kisi.id}/${kisi.avatar}.png"
  }`)

  profil[req.user.id] = veri;

  var obj = JSON.stringify(profil)

  fs.writeFile('./profil.json', obj)

  res.redirect('/kullanici/'+req.user.id)

    }
  })

});

let profil = JSON.parse(fs.readFileSync('./profil.json', 'utf8'))
client.profil = profil

app.get("/ed/hatalar", (req,res) => {
  renderTemplate(res, req, "ed-hatalar.ejs")
})

app.get("/ed/uptimerobot", (req,res) => {
  renderTemplate(res, req, "ed-uptime.ejs")
})

app.get("/ed/glitchmodul", (req,res) => {
  renderTemplate(res, req, "ed-gmodul.ejs")
})

app.get("/ed/botyapma", (req,res) => {
  renderTemplate(res, req, "ed-bot.ejs")
})

app.get("/ed", (req,res) => {
  renderTemplate(res, req, "ed.ejs")
})

app.get("/vutututu", checkAuth, (req,res) => {
  renderTemplate(res, req, "botekle.ejs")
})

app.post("/vutututu", checkAuth, (req, res) => {

let ayar = req.body

if (ayar === {} || !ayar['id'] || !ayar['prefix'] || !ayar['dil'] || !ayar['aciklama']) return res.sendFile(__dirname +"/site/404.html")

let ID = ayar['id']

if(client.guilds.get(ID)) return res.json({
  hata: "Bot Zaten Sunucumuzda Eklidir."
})
  
db.set(`prefix_${ID}`, ayar['prefix'])
db.set(`dil_${ID}`, ayar['dil'])
db.set(`sahip_${ID}`, req.user.id)
db.set(`aciklama_${ID}`, ayar['aciklama'])

db.push(`botlar_${req.user.id}`, ID)

var çen = client.channels.get("530756322040479754")

çen.send(new Discord.RichEmbed()
.setColor("RANDOM")
.addField("Yeni Bot Gönderildi!", "[ID: " + ID + "](https://discordapp.com/oauth2/authorize?client_id=" + ID + "&scope=bot&permissions=8)")
.addBlankField()
.addField('Sahip', client.users.get(req.user.id).tag)
.addBlankField()
.addField('Prefix:',ayar['prefix']))

res.redirect('/')  
client.users.get(req.user.id).send(" botunu ilettim. Yakın zamanda eklenir <3") 
})

app.get('/asdfertsd', checkAuth, async(req,res) => {
  var kodlarr = require('./kods.json')
  renderTemplate(res, req, "kodlarv2.ejs", {kodlarr})
})

app.get("/bot/:id", async(req,res) => {
var id = req.params.id

db.fetch(`sahip_${id}`).then(async sahipp => {
const sahip = client.users.get(sahipp).tag
db.fetch(`açıklama_${id}`).then(async acikla => {
db.fetch(`prefix_${id}`).then(async prefix => {
db.fetch(`dil_${id}`).then(async dil => {
db.fetch(`sertifika_${id}`).then(async sertifika => {
if(!sahip) res.sendFile(__dirname + "/site/404.html")
if(!prefix) prefix = "Ayarlanmamış"
if(!acikla) acikla = "Ayarlanmamış"
if(!dil) dil = "Ayarlanmamış"
if(!sertifika) sertifika = "Sertifika Yok"
var sertifikadurum;
if(sertifika === "aktif") sertifikadurum = `<button style="top: 25px; margin-left: 3%;" class="prefix btn btn-primary">✅ Sertifikalı </button>`
else sertifikadurum = ""
const avatar = client.users.get(id).avatarURL
const botaı = client.users.get(id).username
const sahipavatar = client.users.get(sahipp).avatarURL

   renderTemplate(res, req, "bot.ejs", {prefix, sahip, avatar, botaı, acikla, dil, sahipavatar, sertifikadurum})
  
})})})})})})

app.get('/:a/', (req,res) => {
var a = req.params.a
if(a !== "kodlar" || a !== "sunucudavet" || a !== "fordst" || a !== "giris" || a !== "cikis" ||  a !== "botlar" || a !== "ed" || a !== "kullanici" || a !== "b"  || a !== "asdfertsd" ) return res.sendFile(__dirname + '/site/404.html')
})
/*

var prefix = "rc!"

var exec = require('child-process-promise').exec;

client.on('message', message => {
  const args = message.content.slice(1)[0]
  if (message.content.startsWith("ex")) {
  if(!message.member.hasPermission("MANAGE_GUILD")) return;
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
  }})

*/