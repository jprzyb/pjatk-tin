document.getElementById('my_form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;

    const formData = {
        name: form.name.value,
        email: form.email.value,
        age: form.age.value,
        phone: form.phone.value
    };


    try {
        const response = await fetch('/taska_submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById('response').innerText = result.message;
        } else {
            document.getElementById('response').innerText = 'Error!';
        }
    } catch (error) {
        document.getElementById('response').innerText = 'Connection error!';
        console.error('Error:', error);
    }
});