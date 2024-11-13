const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');

// middleware global
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/taskB.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/taskB.html'));
});

app.get('/taskC.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/taskC.html'));
});

app.get('/taskD.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/taskD.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on: http://localhost:${PORT}`);
});
