const loginUser = async (login, password) => {
    try {
        const url = `/api/login?login=${encodeURIComponent(login)}&password=${encodeURIComponent(password)}`;
        const response = await fetch(url, { method: 'GET' });

        if (response.ok) {
            const data = await response.json();
            console.log('Login success:', data);
            window.location.href = '/index';
        } else {
            const error = await response.text();
            console.error('Invalid login:', error);
            alert('Invalid login');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Cannot establish connection with the server.');
    }
};

document.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.querySelector('#login').value;
    const password = document.querySelector('#password').value;
    loginUser(login, password);
});
