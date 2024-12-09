function addCampaignsToTable(campaigns) {
    const tableBody = document.querySelector("#campaignsTable tbody");

    campaigns.forEach(campaign => {
        const row = document.createElement("tr");
        row.dataset.id = campaign.id;

        const cellId = document.createElement("td");
        cellId.textContent = campaign.id;
        row.appendChild(cellId);

        const cellName = document.createElement("td");
        cellName.textContent = campaign.name;
        row.appendChild(cellName);

        const cellPlannedRates = document.createElement("td");
        cellPlannedRates.textContent = campaign.plannedRates;
        row.appendChild(cellPlannedRates);

        const cellCurrentRates = document.createElement("td");
        cellCurrentRates.textContent = campaign.currentRates;
        row.appendChild(cellCurrentRates);

        const cellStartDate = document.createElement("td");
        cellStartDate.textContent = campaign.startDate;
        row.appendChild(cellStartDate);

        const cellEndDate = document.createElement("td");
        cellEndDate.textContent = campaign.endDate;
        row.appendChild(cellEndDate);

        const cellEmpId = document.createElement("td");
        cellEmpId.textContent = campaign.empId;
        row.appendChild(cellEmpId);

        const cellCliId = document.createElement("td");
        cellCliId.textContent = campaign.cliId;
        row.appendChild(cellCliId);

        tableBody.appendChild(row);
    });
    addRowClickEvent();
}



window.onload = function() {
    addCampaignsToTable(campaignsData);
    document.querySelectorAll('th').forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-column');
            const isAscending = header.classList.contains('asc');
            document.querySelectorAll('th').forEach(h => h.classList.remove('asc', 'desc'));
            header.classList.toggle('asc', !isAscending);
            header.classList.toggle('desc', isAscending);

            sortTable(column, !isAscending);
        });
    });
};

function sortTable(column, ascending = true) {
    const sortedData = [...campaignsData].sort((a, b) => {
        if (typeof a[column] === 'string') {
            return ascending ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
        }
        return ascending ? a[column] - b[column] : b[column] - a[column];
    });
    populateTable(sortedData);
}

function populateTable(data) {
    const tableBody = document.querySelector('#campaignsTable tbody');
    tableBody.innerHTML = '';

    data.forEach(campaign => {
        const row = document.createElement('tr');
        row.dataset.id = campaign.id;
        row.innerHTML = `
            <td>${campaign.id}</td>
            <td>${campaign.name}</td>
            <td>${campaign.plannedRates}</td>
            <td>${campaign.currentRates}</td>
            <td>${campaign.startDate}</td>
            <td>${campaign.endDate}</td>
            <td>${campaign.empId}</td>
            <td>${campaign.cliId}</td>
        `;
        tableBody.appendChild(row);
    });

    addRowClickEvent();
}

function addRowClickEvent() {
    const tableRows = document.querySelectorAll('#campaignsTable tbody tr');
    tableRows.forEach(row => {
        console.log('Adding click event to row with data-id:', row.dataset.id);
        row.addEventListener('click', () => {
            const campaignId = row.dataset.id;
            if (!campaignId) {
                alert('Brak ID kampanii!');
                return;
            }
            window.location.href = `/campaignDetails?id=${campaignId}`;
        });
    });
}

