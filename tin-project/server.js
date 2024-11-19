let express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

const mysql = require("mysql2");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tin',
    password: 'admin',
    database: 'tin_project'
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server.js [INFO]: http://localhost:${PORT}`);
});

// ENDPOINT =================================================================================================================================================================================================================================================================================================================================================

app.get('/', (req, res) => {
    // if not logged in
    res.render('pages/login');
});

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.get('/trylogin', (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    console.log("server [INFO] usr, pass: " + username, password);

    let valid_login = tryLogin(username, password);

    console.log("server [INFO] valid_login: " + valid_login);

    if (valid_login != -1) {
        let user = getUsrById(valid_login);
        console.log("server [INFO] user: " + user);
        res.render('pages/main', { user });
    } else {
        res.status(401).send('Unauthorized');
    }
});

// LOGIN =================================================================================================================================================================================================================================================================================================================================================

function tryLogin(usr, pass) {
    let query = 'SELECT emp_id FROM Login WHERE login like ? AND pass like ?';

    console.log("login [INFO]: " + usr, pass);

    let res;
    db.query(query, [usr, pass], (err, results) => {
        if (err) {
            console.log('login [ERROR] database error: ', err);
            return -1;
        }
        res = results[0]['emp_id']
        console.log('login [INFO] query result:', res);
        return res;
    });
    return res;
}

// Employee =================================================================================================================================================================================================================================================================================================================================================

function getUsrById(id) {
    let query = 'SELECT * FROM employee WHERE id = ?';
    console.log("employee [INFO] id: " + id);
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('"employee [ERROR]: " + Database error:', err);
            return;
        }
        console.log('employee [INFO] result: ', results);});
}