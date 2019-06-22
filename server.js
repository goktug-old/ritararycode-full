const http = require('http');
const express = require('express');
const app = express();
var request = require('request');
const db = require('quick.db')

app.use(express.static('public'));    

const Discord = require('discord.js')
const client = new Discord.Client()
client.login("NTMxMDE4ODYzODgyNzk3MDU2.XORRJQ.skLIuH9KXrwWRVFAgkUxZdkXxhc").catch(e => {
  if(!e) return;
  else console.log(e)
})
var başvuruwebhook = new Discord.WebhookClient("562159564431294495","yKcEo2vS0Y6840ft9YbnqJkteYBI_QN1SwVXMrIwZq_5kJkHc02Tx87A2NLlW5gR6Z2K")

app.listen(process.env.PORT)

const url = require("url");

client.on('ready', () => {
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
callbackURL: "https://ritararycode.tk/callback",
scope: ["identify", "guilds.join"]
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

var karaliste = []

const fetchh = require("node-fetch")

function checkAuth(req, res, next) {
if (req.isAuthenticated()) { 
if(karaliste.some(a => req.user.id === a)) return res.send('Karalistedesin Sie')
if(!client.guilds.get("530744872328626197").member(req.user.id)) return res.send("Sunucuya gelmelisin <a href = 'https://discord.gg/8CqPzjp'>Tiklat</a>")
 /*request(`http://discordapp.com/api/guilds/530744872328626197/members/${req.user.id}`,
            {
              method: 'PATCH',
              json: {
                
              },
              headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json",
              },
            }, (error, response) => {
            setTimeout(() => {
              if(error) console.log(error)
               console.log(response)
            }, 500)})*/
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

app.get("/autherror", (req,res) => {
  res.redirect("/")
})

const a = []

client.on("ready", () => {
client.guilds.get("530744872328626197").members.forEach(command => {
  db.fetch(`sertifika_${command.user.id}`).then(ab => {
  if(ab === "aktif") { a.push(command.user.id) }
})})
})

app.get("/", (req,res) => {
renderTemplate(res, req, "anasayfa.ejs", { a });
})

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


var kodlar = {
"xlGF0KU3l9KPYQgjSObXBugJR""alıntı":,
"FhvPoycigCGAnCVz4MlLgtpBx""bakım":,
"om5UNPqUzdgpkCaWEX36frtSg""ban":,
"lbYGgkdDJoHdO89xo1PYRSppP""başvur":,
"vEJLwgq0dGkBXosG7XV77XD47""bototorola":,
"yfxvyRdCa8tI6XcsxNwEbDCTv""bototorolb":,
"jz1mHO34kcKU48e740Co1HyH0""capslock":,
"ur39Z498owzd4XBcVIVnM9iym""caslockb":,
"KPiSth7xnxGJdSWH4HEsmcXNY""davetçıkar":,
"3yMEVo8GTBBxOrHDPOZo3EXKh""destek",
"ZjJaaI2F7YAK88hJkkugOwvwy""destekü",
"XI0XPmHCI1xDlCVVcPqHT6xko""değişenoynuyor",
"t3eRfdaqil4dl0m6AWXR3nVrj""dmkayıt":,
"3mhPi7O1f7OL6R1V5TgaUhk63""dmkayıto":,
"tjYVt3lKNiNvzj6ooK9WbpC13""dmlog":,
"cJHf1M38ZgAGBq9XYVaxRGGeV""etiketprefix":,
"b47FT6QZJAIfjRvGeEiQYELOD""exec":,
"GsqvqgjhhXPRSJxSaecV60T6N""girişçıkış":,
"09SevrwF9nd6PIBhxUhfMdAIZ""gold":,
"n6y3X4G3BwMflmjHAYfNv3fVH""hesapgen":,
"7tVTw3QOQoQNgEvjFPVJXH3w8""js":,
"zlKyhBkXvJcWNbbWrEN2dyp7r""kanalduyuru":,
"b0kMBLT6rmxhWExIuScGYooTJ""kanalkonu":,
"nV7JPn4bzmVTMFxtCtQSLIJHE""kapat":,
"9HGkhAbLBRAFAFhDf0ZNsac8s""karaliste":,
"2EdUk1lO3aicQo5ki19ywmV1h""karalistek":,
"7jJUE3mu13cY2a30S9NHjncHA""kayıt":,
"2HS3Gq99l97wyQODkkjd07Ry5""konuştur":,
"zpU2FU70VuSvOAsmZubZASqeG""messagejs":,
"I948vsloozby5ukRYSJKQg0Yi""notal":,
"hzV9Okjm1Bz7URHJqnJ5ByM4Z""notsil":,
"dI3UN536Z1sKXqncWRQtfgeeE""otorola":,
"7LMQM3dWinYhsbadRkz61DHBz""otorolb":,
"pkFLSp9FfNiEgceejlzTFOnNl""otorolk":,
"AY5mnX8MnDwQGAxSeOdiEtcl3""prefix":,
"jzZGHLiUepn48PvwF4Hqi9uh2""sayıseçmeliyardım":,
"V9hgdew3CoN2sbv1H5ktFLCHU""snipe":,
"Szzwzoy9TRkyxG7jjdkR21fQX""snipeb":,
"Booxr7HarcSGRjU4ipCfhGEnv""sor":,
"cao58E2M8tr8kZXvzkpPC6Np5""sunucular",
"jucBLZFXn8VuHxipY5ok1OARN":"sunucuyakatılldımayrıldım",
"tEXiO1MKn65t13YOhd3R" "ultra":,
"Ww0sZWQFsykc3JF2IUfG" "ultrab":,
"KW5YOZT65ScLMFfJtBB3" "çalışmakanal":,
"VnB93myn3g2DIcfdlyTw" "çekiliş":,
"7G00ddMpn2EB3wsLOGrd" "şarkısözü":
}

const fs = require('fs')

app.get("/kodlar/:kod", checkAuth, async (req, res) => {
  if(!req.params.kod) return res.redirect("/kodlar")
  var kod = kodlar[req.params.kod]
  if(!kod) return res.sendFile(__dirname + "/site/404.html")
  var kodisim = req.params.kod
  var kodlink = "https://paste.ritararycode.tk/kod/" + kod
  renderTemplate(res, req, "kod.ejs", {fs, kod, kodisim, kodlink})
  
})



app.get("/b", checkAuth, (req,res) =>{
  renderTemplate(res,req, "basvur.ejs")
})

app.post("/b", checkAuth, (req,res) => {
   var isim = req.body["isim"]
   var bilgi = req.body["bilgi"]
   
başvuruwebhook.send(new Discord.RichEmbed()
         .addField("Isim:", isim)
         .addField("Bilgi:",bilgi)
         .addField("Discord:",`${req.user.username + "#" + req.user.discriminator} ( ${req.user.id} )`)
         )
res.redirect("/")
})

app.get("/botekle", checkAuth, (req,res) => {
  renderTemplate(res, req, "botekle.ejs")
})

app.post("/botekle", checkAuth, (req, res) => {

let ID = req.body['id']

if(client.users.get(ID)) {
  client.users.get(req.user.id).send(`${ID} ID'li Botunuz Zaten Sunumuzda Bulunmakta!`) 
  return res.redirect("/")
} else {
  
db.set(`prefix_${ID}`, req.body['prefix'])
db.set(`dil_${ID}`, req.body['dil'])
db.set(`sahip_${ID}`, req.user.id)
db.set(`aciklama_${ID}`, req.body['aciklama'])

db.push(`botlar_${req.user.id}`, ID)

var çen = client.channels.get("530756322040479754")

çen.send(new Discord.RichEmbed()
.setColor("RANDOM")
.addField("Yeni Bot Gönderildi!", "[ID: " + ID + "](https://discordapp.com/oauth2/authorize?client_id=" + ID + "&scope=bot&permissions=8)")
.addBlankField()
.addField('Prefix:',req.body['prefix']))

res.redirect('/')  
client.users.get(req.user.id).send(`${ID} ID'li Botunuz Görevlilere Iletilmiştir`) 
}})

app.get('/gizli/dosyalar/kodlarr', checkAuth, async(req,res) => {
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

app.get("/kodpaylas", (req,res) => {
  renderTemplate(res, req, "paylas.ejs")
})

app.get("/panel", (req,res) => {
  renderTemplate( res, req, "panel.ejs", { db } )
})

app.get('*', function(req, res){
  res.status(404).sendFile(__dirname + '/site/404.html');
});