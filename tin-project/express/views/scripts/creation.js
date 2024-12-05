document.querySelector('#new-creation').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.querySelector('#id').value;
    const filePath = document.querySelector('#filePath').value;
    const campaignId = document.querySelector('#campaignId').value;
    if(validate(filePath)){
        return createCreation(id, filePath, campaignId);
    }
    return false;
});

document.getElementById('skipButton').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `/campaigns`;
});

const createCreation = async (id, filePath,campaignId) => {
    try {
        const url = `http://localhost:8080/api/create_creation`;

        const payload = {
            id: 1,
            filePath: filePath,
            campaignId: campaignId,
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });


        if (response.ok) {
            const data = await response.json();
            console.log('Creation created successfully:', data);
            alert('Creation created successfully');
            window.location.href = `/campaigns`;
        } else {
            const error = await response.text();
            console.error('Error creating creation:', error);
            alert('Failed to create creation');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Cannot establish connection with the server.');
    }
};

function validate(filePath) {
    const pathRegex = /^(\/|\.\/|\.\.\/)?([\w.-]+\/)*[\w.-]*$/;
    return typeof filePath === 'string' && pathRegex.test(filePath);
}