
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
client.login("NTMxMDE4ODYzODgyNzk3MDU2.XORRJQ.skLIuH9KXrwWRVFAgkUxZdkXxhc")
client.ayar = db
client.useful = useful;
/*
app.use(express.router());

app.use(function(req, res, next){
  res.status(404);
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  res.type('txt').send('Not found');
});

client.yetkililer = ["312927505252089866","491231235801088000","384385666345336832","495825025207894016","521557165542998016"] 
client.sunucuyetkililer = client.yetkililer
client.webyetkililer = client.yetkililer
*/
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

const fetchh = require("node-fetch")

function checkAuth(req, res, next) {
if (req.isAuthenticated()) { 
if(!client.guilds.get("530744872328626197").members.get(req.user.id)) return res.send("Sunucnya gelmelisin <a href = 'https://discord.gg/8CqPzjp'>Tiklat</a>")
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
else return next();
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
  if(!command.user.bot) return;
  //if(command.user.id === "518717000487534593" || command.user.id === "436527843959111681" || command.user.id === "552860386727165980" || command.user.id === "235088799074484224" || command.user.id === "531018863882797056" || command.user.id === "553270538034741248" || command.user.id === "551841231961849878" || command.user.id === "473284664711446529" || command.user.id === "540902460747677716" || command.user.id === "518145591860264961" || command.user.id === "540978976617660416" || command.user.id === "436527843959111681" || command.user.id === "351611743018942464" || command.user.id === "294882584201003009" || command.user.id === "548149568681017367" || command.user.id === "172002275412279296" || command.user.id === "275813801792634880" || command.user.id === "422087909634736160" || command.user.id === "500297618505859072" || command.user.id === "527858318786691092" || command.user.id === "409875566800404480")return;
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
  "cekilis": `<p><a href="https://www.turkkod.cf/~5cf2a8a3f6a532007870359f">komulatr/cekilis.js</a></p><p><a href="https://www.turkkod.cf/~5cf2a8cef6a53200787035a0">komutlar/reroll.js</p>`,
  "golduye":`<p><a href="https://turkkod.tk/~5cf2abb6f6a53200787035a1">komutlar/gold.js</a></p><p><a href ="https://www.turkkod.cf/~5cf2acc0f6a53200787035a2">bot.js / server.js</a></p>`,
  "capsengel": `<p><a href="https://turkkod.cf/~5cf5533ac6ba0d00785271be">bot.js || server.js</a></p><p><a href="https://turkkod.cf/~5cf55317c6ba0d00785271bc">kmutlaro/capsengel.js</a></p>`,
}

app.get("/kodlar/:kod", checkAuth, async (req, res) => {
  if(!req.params.kod) return res.redirect("/kodlar")
  var kod = kodlar[req.params.kod]
  if(!kod) return res.sendFile(__dirname + "/site/404.html")
  var kodisim = req.params.kod
  renderTemplate(res, req, "kod.ejs", {fs, kod, kodisim})
  
  })


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

app.get("/b", checkAuth, (req,res) =>{
  renderTemplate(res,req, "basvur.ejs")
})

app.post("/b", checkAuth, (req,res) => {
//  var id = req.params.id
 // if(id !== req.user.id) return res.redirect("/")
   var isim = `${req.body["isim"]}`
 //  var dcname = `${req.body["dcname"]}`
   var bilgi =`${req.body["bilgi"]}`
var web = new Discord.WebhookClient("562159564431294495","yKcEo2vS0Y6840ft9YbnqJkteYBI_QN1SwVXMrIwZq_5kJkHc02Tx87A2NLlW5gR6Z2K")

web.send(new Discord.RichEmbed()
         .addField("Isim:", isim)
         .addField("Bilgi:",bilgi)
         .addField("Discord Kullanici adi:",req.user.username + "#" + req.user.tag)
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
  
})})})})})})/*

app.get('*', (req,res) => {
if(res.status(404)) return res.sendFile(__dirname +"/site/404.html")
//var a = req.params.a
//if(a !== "kodlar" || a !== "sunucudavet" || a !== "fordst" || a !== "giris" || a !== "cikis" ||  a !== "botlar" || a !== "ed" || a !== "kullanici" || a !== "b"  || a !== "asdfertsd" ) return res.sendFile(__dirname + '/site/404.html')
})*/

app.get('*', function(req, res){
  res.status(404).sendFile(__dirname + '/site/404.html');
});