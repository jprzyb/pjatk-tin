document.querySelector('#new-creation').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.querySelector('#id').value;
    const fileName = document.querySelector('#fileName').value;
    const isAnimated = document.querySelector('#isAnimated').checked;
    const campaignId = document.querySelector('#campaignId').value;
    if(validate(fileName)){
        return createCreation(id, fileName, isAnimated, campaignId);
    }
    return false;
});

document.getElementById('skipButton').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `/campaigns`;
});

const createCreation = async (id, fileName, isAnimated, campaignId) => {
    try {
        const url = `/api/create_creation`;

        const payload = {
            id: 1,
            fileName: fileName,
            isAnimated: isAnimated,
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
            document.querySelector("#error").textContent = `${data.fileName} Added successfully. Want to add next?`;
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

function validate(fileName) {
    const pathRegex = /^(\/|\.\/|\.\.\/)?([\w.-]+\/)*[\w.-]*$/;
    return typeof fileName === 'string' && pathRegex.test(fileName);
}