document.getElementById('contactForm').addEventListener('submit', async function(event) {
event.preventDefault();

const form = event.target;
const formData = new FormData(form);

try {
    const response = await fetch('/taska_submit', {
    method: 'POST',
    body: formData,
});

    if (response.ok) {
    const result = await response.json();
    document.getElementById('response').innerText = 'Wiadomość wysłana pomyślnie!';
} else {
    document.getElementById('response').innerText = 'Wystąpił błąd podczas wysyłania.';
}
} catch (error) {
    document.getElementById('response').innerText = 'Nie udało się nawiązać połączenia.';
    console.error('Błąd:', error);
}
});