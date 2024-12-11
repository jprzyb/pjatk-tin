function populateTable(data) {
    const tableBody = document.querySelector('#creationsTable tbody');
    tableBody.innerHTML = '';

    data.forEach(creation => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${creation.id}</td>
            <td>${creation.fileName}</td>
            <td>${creation.isAnimated}</td>
        `;
        tableBody.appendChild(row);
    });
}

window.onload = function() {
    console.log(creationsData)
    populateTable(creationsData);
}

document.addEventListener('DOMContentLoaded', function() {
    const saveButton = document.querySelector('button[type="submit"]');
    const errorElement = document.querySelector('#error');

    saveButton.addEventListener('click', function() {
        const campaignId = document.querySelector('.campaign-id').value;
        const campaignName = document.querySelector('.campaign-name').value;
        const plannedRates = document.querySelector('.campaign-planned-rates').value;
        const currentRates = document.querySelector('.campaign-current-rates').value;
        const startDate = document.querySelector('.campaign-start-date').value;
        const endDate = document.querySelector('.campaign-end-date').value;
        const empId = document.querySelector('.campaign-emp-id').value;
        const cliId = document.querySelector('.campaign-cli-id').value;

        const campaignData = {
            id: campaignId,
            name: campaignName,
            plannedRates: plannedRates,
            currentRates: currentRates,
            startDate: startDate,
            endDate: endDate,
            empId: empId,
            cliId: cliId
        };

        fetch('/api/update_campaign', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campaignData)
        })
            .then(response => response.json())
            .then(data => {
                errorElement.textContent = 'Campaign updated successfully!';
            })
            .catch(error => {
                errorElement.textContent = `There was an error updating the campaign. ${error}`;
            });
    });
});