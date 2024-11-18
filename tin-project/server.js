const express = require('express');
const mysql = require('mysql2');

const app = express();

// Ustawienia połączenia z bazą danych
const db = mysql.createConnection({
    host: 'localhost', // Adres hosta (np. localhost lub adres serwera)
    user: 'tin',      // Użytkownik bazy danych
    password: 'admin',  // Hasło do bazy danych
    database: 'tin_project'    // Nazwa bazy danych
});

// Połączenie z bazą danych


// Przykładowy endpoint
app.get('/', (req, res) => {
    res.send('Witamy w aplikacji połączonej z MySQL!');
});

// Endpoint pobierający dane z bazy
app.get('/employees', (req, res) => {
    const query = 'SELECT * FROM Employee'; // Przykładowe zapytanie
    db.query(query, (err, results) => {
        if (err) {
            console.error('Błąd podczas wykonywania zapytania:', err.message);
            res.status(500).send('Błąd serwera');
            return;
        }
        res.json(results); // Zwrócenie wyników jako JSON
    });
});

// Uruchomienie serwera
app.listen(3000, () => {
    console.log('Serwer Express.js działa na porcie 3000');
});
