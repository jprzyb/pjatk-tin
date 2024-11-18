const mysql = require("mysql2");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tin',
    password: 'admin',
    database: 'tin_project'
});

const query = 'SELECT COUNT(1) FROM Login';

function tryLogin(usr, pass) {
    db.connect((err) => {
        if (err) {
            console.error('Nie udało się połączyć z bazą danych:', err.message);
            return -1;
        }
    });

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Błąd serwera');
            return -1;
        }
        return res.json(results);
    });
}