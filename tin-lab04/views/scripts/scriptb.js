const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=pepe';

async function fetchData() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('ERROR:', error);
        document.querySelector('.pepeData').innerHTML = 'ERROR: Could not fetch data';
    }
}

function displayData(data) {
    const dataElement = document.querySelector('.pepeData');
    const currentDate = document.querySelector('.currentDate');

    const price = data[0].current_price;
    const cd = new Date().toLocaleString();

    dataElement.innerHTML = `Current PEPE price: $${price}`;
    currentDate.innerHTML = 'Last update: ' + cd;
}

setInterval(fetchData, 10000);

fetchData();
