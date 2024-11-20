const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    let error = ""
    res.redirect('/login');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/login', (req, res) => {
    let error = ""
    res.render('pages/login', {error});
})

app.get('/tryLogin', (req, res) => {
    if(res.json({id} !== undefined) && res.json({login} !== undefined) && res.json({password} !== undefined)){
        let error = "Success"
        res.render('pages/login', {error});
    }else{
        let error = "Bad cridentials"
        res.render('pages/login',{error});
    }
})

function sendLogin(){
}