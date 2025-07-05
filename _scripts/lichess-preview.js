

const username = 'Spazzamatic1400';  // Replace with actual username
const apiUrl = `https://lichess.org/api/user/${username}/rating-history`;

// Function to process the data and extract ratings and dates
function processData(data, gameType) {
    const gameData = data.find(item => item.name === gameType);

    if (!gameData) {
        console.error(`No data found for ${gameType}`);
        return { labels: [], ratings: [] };
    }

    const labels = gameData.points.map(entry => {
        const date = new Date(entry[0], entry[1] - 1, entry[2]); // Convert year, month, day
        return date.toLocaleDateString();
    });

    const ratings = gameData.points.map(entry => entry[3]); // Extract rating

    return { labels, ratings };
}

// Fetch data from the Lichess API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Process Rapid and Blitz data
        const rapidData = processData(data, 'Rapid');
        const blitzData = processData(data, 'Blitz');

        // Create the chart with both Rapid and Blitz data
        renderChart(rapidData, blitzData);
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to render the chart
function renderChart(rapidData, blitzData) {
    const ctx = document.getElementById('ratingChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: rapidData.labels, // Use Rapid's dates as common labels
            datasets: [
                {
                    label: 'Rapid Rating',
                    data: rapidData.ratings,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                    pointRadius: 0,
                },
                {
                    label: 'Blitz Rating',
                    data: blitzData.ratings,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false,
                    pointRadius: 0,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Date',
                        color: '#FF5733'  // Missing color property here
                    },
                    ticks: {
                        color: '#FF5733'  // Missing color for x-axis ticks
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Rating',
                        color: '#FF5733'  // Missing color property here
                    },
                    ticks: {
                        color: '#FF5733'  // Missing color for y-axis ticks
                    },
                },
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#FF5733'  // Change this to your desired color
                    }
                },
                tooltip: {
                    bodyColor: '#FF5733',  // Change this to your desired color for tooltips
                    titleColor: '#FF5733'  // Change this to your desired color for tooltip title
                },
                title: {
                    display: true,
                    text: 'Lichess Rating History',
                    color: '#FF5733'  // Change this to your desired color
                }
            },
        }
    });
}