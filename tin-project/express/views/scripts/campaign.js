function populateTable(data) {
    const tableBody = document.querySelector('#creationsTable tbody');
    tableBody.innerHTML = '';

    data.forEach(creation => {
        const row = document.createElement('tr');
        row.dataset.id = campaign.id;
        row.innerHTML = `
            <td>${creation.id}</td>
            <td>${creation.fileName}</td>
            <td>${creation.isAnimated}</td>
        `;
        tableBody.appendChild(row);
    });
}

window.onload = function() {
    addCampaignsToTable(creationsData);
}