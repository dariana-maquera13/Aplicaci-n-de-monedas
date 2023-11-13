document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://api.frankfurter.app/latest?from=USD';

    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.rates;
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    }

    async function createChart() {
        const rates = await fetchData();
        const labels = Object.keys(rates);
        const values = Object.values(rates);

        const ctx = document.getElementById('currencyChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tasa de Cambio',
                    borderColor: '#3498db',
                    borderWidth: 2,
                    fill: false,
                    data: values,
                }],
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                    },
                    y: {
                        min: 0,
                    },
                },
            },
        });
    }

    createChart();
});
