window.onload = function() {
    addClientsToTable(clientsData);
};

function addClientsToTable(clients) {
    const tableBody = document.querySelector("#clientsTable tbody");

    clients.forEach(client => {
        const row = document.createElement("tr");

        const cellId = document.createElement("td");
        cellId.textContent = client.id;
        row.appendChild(cellId);

        const cellName = document.createElement("td");
        cellName.textContent = client.name;
        row.appendChild(cellName);

        const cellBankAccount = document.createElement("td");
        cellBankAccount.textContent = client.bankAccount;
        row.appendChild(cellBankAccount);

        const cellContractDate = document.createElement("td");
        cellContractDate.textContent = client.contractDate;
        row.appendChild(cellContractDate);

        tableBody.appendChild(row);

        window.dispatchEvent(new Event('resize'));
    });
}

document.querySelector('#new-campaign').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const plannedRates = document.querySelector('#plannedRates').value;
    const startDate = document.querySelector('#startDate').value;
    const endDate = document.querySelector('#endDate').value;
    const cliId = document.querySelector('#cliId').value;
    const currentRates = document.querySelector('#currentRates').value;
    const empId = document.querySelector('#empId').value;

    if (validate(name, plannedRates, startDate, endDate, cliId, currentRates, empId)) {
        try {
            const response = await fetch('/api/campaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    plannedRates,
                    startDate,
                    endDate,
                    cliId,
                    currentRates,
                    empId
                })
            });

            if (!response.ok) {
                throw new Error(`Błąd HTTP! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            document.querySelector("#error").textContent = "Kampania została utworzona!";
            window.location.href = `/new_creation?id=${data.id}`;
        } catch (error) {
            console.error('Error:', error.message);
            document.querySelector("#error").textContent = `Wystąpił błąd: ${error.message}`;
        }
    } else {
        document.querySelector('#error').textContent = "Invalid data";
    }
});

const validate = (name, plannedRates, startDate, endDate, cliId, currentRates, empId) => {

    if (!name || name.trim() === '') {
        alert('Name cannot be empty');
        return false;
    }

    if (isNaN(plannedRates) || plannedRates <= 0) {
        alert('Planned Rates should be a valid positive number');
        return false;
    }

    let start = new Date(startDate);
    let end = new Date(endDate);

    if (isNaN(start.getTime()) && startDate >= Date.now()) {
        alert('Invalid start date format');
        return false;
    }

    if (isNaN(end.getTime())) {
        alert('Invalid end date format');
        return false;
    }

    if (start >= end) {
        alert('Start date must be before end date');
        return false;
    }

    if (isNaN(cliId) || cliId <= 0) {
        alert('Client ID should be a valid positive number');
        return false;
    }

    return true;
};
