event.preventDefault();

const login = document.getElementById('login').value;
const password = document.getElementById('password').value;

console.log('Login:', login);
console.log('Password:', password);

fetch(`http://localhost:8080/api/login?login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`, {
    method: 'GET',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('ERROR:', error);
    });