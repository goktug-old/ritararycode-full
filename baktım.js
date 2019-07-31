const app = require('express')()
app.listen(process.env.PORT)

app.get('*', (req, res) => {
  res.sendFile(__dirname + "/site/bakım.html")
})