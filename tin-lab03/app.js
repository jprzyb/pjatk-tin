const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '/public')));

// middleware
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});



app.listen(PORT, () => {
    console.log(`Server started on: http://localhost:${PORT}`);
});
