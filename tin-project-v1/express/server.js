const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.render('pages/login');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/login', (req, res) => {
    res.render('pages/login');
})

function sendLogin(){
}