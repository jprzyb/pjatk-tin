let express = require('express');
// const res = require("express/lib/response");
let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    // if not logged in
    res.render('pages/login');
});

app.get('/login', (req, res) => {
    res.render('pages/login');
});


// Uruchomienie serwera
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
