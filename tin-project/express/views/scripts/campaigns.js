function addCampaignsToTable(campaigns) {
    const tableBody = document.querySelector("#campaignsTable tbody");

    campaigns.forEach(campaign => {
        const row = document.createElement("tr");

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

        // Dodaj wiersz do tabeli
        tableBody.appendChild(row);
    });
}

window.onload = function() {
    addCampaignsToTable(campaignsData);
};