---
layout: about
title: about
permalink: /
subtitle: From Victoria, BC, living in Montréal since 2018.

profile:
  align: left
  image: profile_pic_toque.png
  image_circular: false # crops the image to make it circular
  more_info: >
    <p>dodobird181@gmail.com</p>
    <p>Le Plateau-Mont-Royal</p>
    <p>Montréal, Québec</p>

selected_papers: false # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: false # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

<img src="../../assets/img/logo.png" width="50px"/>

<canvas id="ratingChart" width="600" height="400"></canvas>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
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
</script>

Write your biography here. Tell the world about yourself. Link to your favorite [subreddit](http://reddit.com). You can put a picture in, too. The code is already in, just name your picture `prof_pic.jpg` and put it in the `img/` folder.

Put your address / P.O. box / other info right below your picture. You can also disable any of these elements by editing `profile` property of the YAML header of your `_pages/about.md`. Edit `_bibliography/papers.bib` and Jekyll will render your [publications page](/al-folio/publications/) automatically.

Link to your social media connections, too. This theme is set up to use [Font Awesome icons](https://fontawesome.com/) and [Academicons](https://jpswalsh.github.io/academicons/), like the ones below. Add your Facebook, Twitter, LinkedIn, Google Scholar, or just disable all of them.
