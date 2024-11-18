const mysql = require("mysql2");
const db = mysql.createConnection({
    host: 'localhost', // Adres hosta (np. localhost lub adres serwera)
    user: 'tin',      // Użytkownik bazy danych
    password: 'admin',  // Hasło do bazy danych
    database: 'tin_project'    // Nazwa bazy danych
});