const axios = require("axios");

function sendLogin(){
    const url = 'localhost:8080/api/login';

    axios.get(url)
        .then(response => {
            console.log('Dane:', response.data);
        })
        .catch(error => {
            console.error('Wystąpił błąd:', error);
        });
}