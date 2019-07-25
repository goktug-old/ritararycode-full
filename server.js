const http = require('http');
const express = require('express');
const app = express();
var request = require('request');
const db = require('quick.db')

app.use(express.static('public'));    

const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL'], disableEveryone: true})
client.login("NTMxMDE4ODYzODgyNzk3MDU2.XORRJQ.skLIuH9KXrwWRVFAgkUxZdkXxhc").catch(e => {
  if(!e) return;
  else console.log(e)
})
var başvuruwebhook = new Discord.WebhookClient("562159564431294495","yKcEo2vS0Y6840ft9YbnqJkteYBI_QN1SwVXMrIwZq_5kJkHc02Tx87A2NLlW5gR6Z2K")

app.listen(process.env.PORT)

const url = require("url");

client.on('ready', () => {
  console.log('EĞEĞEĞEĞEĞEĞEĞEĞ')
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
var temp = template.split(".")[0]
const baseData = {
bot: client,
path: req.path,
db: db,
temp: temp,
user: req.isAuthenticated() ? req.user : null
};try {
res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
} catch(e) {
res.status(404)
}};


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
renderTemplate(res, req, "botlar.ejs", {db});
});

app.get('/botlar/ara/:isim', (req,res) => {
var isim = req.params.isim
if(!isim) return res.sendFile(__dirname +"/site/404.html")
renderTemplate(res, req, "botlara.ejs", {isim})
})

var kodlar = {
"alinti":["xlGF0KU3l9KPYQgjSObXBugJR"],
"bakim":["FhvPoycigCGAnCVz4MlLgtpBx"],
"ban":["om5UNPqUzdgpkCaWEX36frtSg"],
"basvuru":["lbYGgkdDJoHdO89xo1PYRSppP"],
"bot-uyeotorol":["vEJLwgq0dGkBXosG7XV77XD47","yfxvyRdCa8tI6XcsxNwEbDCTv"],
"capsengel":["jz1mHO34kcKU48e740Co1HyH0","ur39Z498owzd4XBcVIVnM9iym"],
"davetcikar":"KPiSth7xnxGJdSWH4HEsmcXNY",
"ayarlanabilirdestek":["3yMEVo8GTBBxOrHDPOZo3EXKh","ZjJaaI2F7YAK88hJkkugOwvwy"],
"degisenoynuyor":["XI0XPmHCI1xDlCVVcPqHT6xko"],
"dmkayit":["t3eRfdaqil4dl0m6AWXR3nVrj"],
"dmlog":["tjYVt3lKNiNvzj6ooK9WbpC13"],
"etiketprefix": ["cJHf1M38ZgAGBq9XYVaxRGGeV"],
"exec":["b47FT6QZJAIfjRvGeEiQYELOD"],
"girişçıkış":["GsqvqgjhhXPRSJxSaecV60T6N"],
"golduye":["09SevrwF9nd6PIBhxUhfMdAIZ","4fnDs7Oiifg0do1zay82"],
"hesapgen":["n6y3X4G3BwMflmjHAYfNv3fVH"],
"jsrol":["7tVTw3QOQoQNgEvjFPVJXH3w8"],
"kanalduyuru":["zlKyhBkXvJcWNbbWrEN2dyp7r"],
"kanalkonu":["b0kMBLT6rmxhWExIuScGYooTJ"],
"karaliste":["9HGkhAbLBRAFAFhDf0ZNsac8s","2EdUk1lO3aicQo5ki19ywmV1h","zpU2FU70VuSvOAsmZubZASqeG"],
"kayıt":["7jJUE3mu13cY2a30S9NHjncHA"],
"konustur":["2HS3Gq99l97wyQODkkjd07Ry5"],
"notsistem":["I948vsloozby5ukRYSJKQg0Yi","hzV9Okjm1Bz7URHJqnJ5ByM4Z","e23bqgC0QhzHmnsg4DoFdim3B","oYkmnuUcvCUivFXONLLrIqvzx"],
"otorol":["dI3UN536Z1sKXqncWRQtfgeeE","7LMQM3dWinYhsbadRkz61DHBz","pkFLSp9FfNiEgceejlzTFOnNl"],
"gyardim":["jzZGHLiUepn48PvwF4Hqi9uh2"],
"snipe":["V9hgdew3CoN2sbv1H5ktFLCHU","Szzwzoy9TRkyxG7jjdkR21fQX"],
"sor":["Booxr7HarcSGRjU4ipCfhGEnv"],
"sunucular":["cao58E2M8tr8kZXvzkpPC6Np5"],
"sunucuyagiriscikislog":["jucBLZFXn8VuHxipY5ok1OARN"],
"ultrasohbettemizleyici":["tEXiO1MKn65t13YOhd3R","Ww0sZWQFsykc3JF2IUfG"],
"prefix-calismakanal":["KW5YOZT65ScLMFfJtBB3","AY5mnX8MnDwQGAxSeOdiEtcl3","nV7JPn4bzmVTMFxtCtQSLIJHE","zpU2FU70VuSvOAsmZubZASqeG"],
"cekilis":["VnB93myn3g2DIcfdlyTw","61xlLgBEDjG2UZqiziJh1e7TW"],
"sarkisozu":["7G00ddMpn2EB3wsLOGrd"],
"yedeksistem": ["https://glitch.com/edit/#!/yedekbotu"],
"dilsistem": ["https://glitch.com/edit/#!/dilsistem-rc"],
"ozelkomut":["CtwmY8lkKQQ6d2NbzHht","ZwwfFrmcv78t18xpgaO4","hrld6iVsiEKqLKBqRjTC","57COhJq5p5QqbgaalaHL","ZEeb9ymg9RpAI5d9cCPc"],
"askolcer": ["w0gs9iA5f5ll1PnmyhYE"]
}

var kodar = ["alinti","askolcer","bakim","ban", "basvuru","bot-uyeotorol","capsengel","davetcikar","dilsistem", "ayarlanabilirdestek","degisenoynuyor","dmkayit","dmlog","etiketprefix","exec","girişçıkı","golduye","hesapgen","kanalduyuru","jsrol","kanalkonu","karaliste","kayıt","konustur","notsistem","ozelkomut","otorol", "gyardim", "snipe", "sor","sunucular","sunucuyagiriscikislog","ultrasohbettemizleyici","prefix-calismakanal","cekilis","sarkisozu","yedeksistem"]

const fs = require('fs')

app.get("/kodlar", checkAuth, (req, res) => {
renderTemplate(res, req, "kodlar.ejs", { kodar });
});

app.get("/kodlar/:kod", checkAuth, async (req, res) => {
  const logger = new Discord.WebhookClient("600289405688610846","93jcTDDK5fMMrZ32GcKo36EB_RbcK_95vYUsTLYE74mHx9A_MyCKbpIU3oW4Z-AwWaGP")
  if(!req.params.kod) return res.redirect("/kodlar")
  var kodd = kodlar[req.params.kod]
  if(!kodd) return res.sendFile(__dirname + "/site/404.html")
  var kod = kodd
  var kodisim = req.params.kod
  var kodlink = "https://paste.ritararycode.tk/kod/" + kod
  renderTemplate(res, req, "kod.ejs", {logger, fs, kod, kodisim, kodlink})
  
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
db.set(`açıklama_${ID}`, req.body['aciklama'])

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

const emojiler = {
   "online": "https://cdn.discordapp.com/emojis/313956277808005120.png",
   "offline": "https://cdn.discordapp.com/emojis/313956277237710868.png",
   "dnd": "https://cdn.discordapp.com/emojis/313956276893646850.png",
   "idle": "https://cdn.discordapp.com/emojis/566624163859660800.png"
}


app.get("/bot/:id", async(req,res) => {
var id = req.params.id
if(!client.users.get(id)) return res.redirect("/404")
var durume = client.users.get(id).presence.status
var durum; 
if(durume === "online") durum = emojiler.online
else if(durume === "offline") durum = emojiler.offline
else if(durume === "dnd") durum = emojiler.dnd
else if(durume === "idle") durum = emojiler.idle
db.fetch(`sahip_${id}`).then(async sahipp => {
const sahippp = client.users.get(sahipp)
if(!sahippp) return res.redirect("/404")
const sahip = sahippp.tag
db.fetch(`açıklama_${id}`).then(async acikla => {
db.fetch(`prefix_${id}`).then(async prefix => {
db.fetch(`dil_${id}`).then(async dil => {
db.fetch(`sertifika_${id}`).then(async sertifika => {
db.fetch(`botlar_${id}.sunucusayi`).then(async swsay => {
db.fetch(`botlar_${id}.shardid`).then(async shardd => {
db.fetch(`botlar_${id}.shardcount`).then(async shardt => {
var shard;
if(!prefix) prefix = "Ayarlanmamış"
if(!acikla) acikla = "Ayarlanmamış"
if(!shardd) shardd = "Modülümüzü kullanmıyor"
if(!shardt) shardt = "Modülümüzü kullanmıyor"
if(shardd === "undefined") shardd = null
if(shardt === "undefined") shardd = null
if(!dil) dil = "Ayarlanmamış"
var sertifikadurum;
if(sertifika === "aktif") sertifikadurum = `<button class="btn btn-success">Sertifikası bulunuyor</button>`
else sertifikadurum = `<button class="btn btn-warning">Sertifikası bulunmuyor</button>`

var shard;
if(!shardd) shard = `<button class="btn btn-warning icbol">Shard Bulunmuyor!</button>`
else if(shardd === "Modülümüzü kullanmıyor") shard = `<button class="btn btn-warning icbol">Modül Bulunamadı!</button>`
else shard = `<button class="btn btn-info icbol">Shard ${shardd}/${shardt}</button>`

if(!swsay) swsay = `<button class="btn btn-warning icbol">Modül Bulunamadı!</button><br>`
else swsay = `<button class="btn btn-info icbol">Sunucu Sayısı: ${swsay}</button><br>`

const avatar = client.users.get(id).displayAvatarURL
const botaı = client.users.get(id).username
const sahipavatar = client.users.get(sahipp).displayAvatarURL

   renderTemplate(res, req, "bot.ejs", {swsay, shard, id, durum, prefix, sahip, avatar, botaı, acikla, dil, sahipavatar, sertifikadurum})
  
})})})})})})})})})

  var asd = ["495825025207894016"]
  

const requesttt = require('node-superfetch');

app.get('/widget/:id', async(req,res) => {
  var id = req.params.id
  let u = client.users.get(id)
  var plan = "https://cdn.discordapp.com/attachments/553228980669382686/587199954481577994/rcwidget-1.png"
  
  var g = "50"
    

db.fetch('sahip_' + id).then(sahip => {       
if(!sahip) return res.redirect("/")
  
  var { createCanvas, loadImage } = require('canvas')
        var canvas = createCanvas(1280, 720)
        var ctx = canvas.getContext('2d');
               
        loadImage(plan).then((arkabg) => {
        loadImage(u.displayAvatarURL).then((avatarURL) => {
        loadImage(client.users.get(sahip).displayAvatarURL).then((avatarURLL) => {
ctx.drawImage(arkabg, 0, 0, 1280, 720);
          
ctx.drawImage(avatarURL, 250, 165, 150, 150);
ctx.drawImage(avatarURLL, 50 , 165, 150, 150);
var sert;
db.fetch('dil_' + id).then(dil => {
var bb = []
var ismm;
dil.split("").forEach(a => bb.push(a))
if(bb.length > 17) ismm = 'bold 21px Impact'
else if(bb.length > 9) ismm = 'bold 32px Impact'
var ism = "bold 32px Impact"
db.fetch('sertifika_' + id).then(sertifika => {   
if(!sertifika || sertifika === "pasif") sert = "pasif"
else sert = sertifika
db.fetch('prefix_' + id).then(prefix => {     
        var re = "db3b3b"
var b = []
var ism;
client.users.get(sahip).tag.split("").forEach(a => b.push(a))
if(b.length > 25) ism = 'bold 16px Impact'
else if(b.length > 13) ism = 'bold 24px Impact'
var ism = "bold 32px Impact"
        var de = 1.6
        ctx.beginPath()
        ctx.fillStyle = `#${re}`;
  ctx.fillStyle = `#fcfdff`;
  ctx.font = ism
        ctx.textAlign = "right";
        ctx.fillText(`${u.tag}`, 865, 250) //${u.tag}
        ctx.fillText(`${client.users.get(sahip).tag}`, 1250, 250)
  ctx.font = ismm
        ctx.fillText(`${dil}`, 325, 475)
  ctx.font = 'bold 36px Impact';
        ctx.fillText(`${prefix}`, 710, 475)
        ctx.fillText(`${sert}`, 1125, 475)
       // ctx.fillText(``,325, 475)
        ctx.beginPath();
        ctx.lineWidth = 8;
  ctx.fill()
     //  ctx.lineWidth = 8;
     //   ctx.arc(43 + 67, 67 + 67, 67, 0, 2 * Math.PI, false);
    ctx.clip();
    
    
res.header('Content-Type', 'image/png');
res.send(canvas.toBuffer());
  })

})})})})
})})
})

app.get('/test/widget', (req,res) => {
  res.send(`
            <a href="/bot/497761216169639936"><img src="https://ritararycode.tk/widget/497761216169639936"></img></a>
`)
})

app.get('/api/bilgiler/:token/:sunucusayisi/:shardid/:shardcount', (req,res) => {
var sunucusayisi = req.params.sunucusayisi
var token = req.params.token
var shardid = req.params.shardid
var shardcount = req.params.shardcount
if(!sunucusayisi) return res.json({ durum: "Sunucu Sayisi Gonderilmedi" })
if(!token) return res.json({ durum: "Token girilmemiş" })
if(shardid === null) shardid = "Shard Yok"
if(shardcount === null) shardcount = "Shard Yok"
db.fetch('token_'+ token).then(botid => {
if(!botid) return res.json({ durum: "Token girilmemiş"})
db.set(`botlar_${botid}.sunucusayi`,sunucusayisi)
db.set(`botlar_${botid}.shardid`,shardid)
db.set(`botlar_${botid}.shardcount`,shardcount)
res.json({ durum: "Başarılı!" })
})})

app.get('*', function(req, res){
  res.status(404).sendFile(__dirname + '/site/404.html');
});