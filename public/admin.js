// Load API usage data and display chart when page loads
document.addEventListener("DOMContentLoaded", function () {
  fetchUsageData();
});

/**
 * Fetches API usage data from the server and updates the chart
 */
async function fetchUsageData() {
  try {
    const response = await fetch("/admin/data");
    const data = await response.json();
    if (response.ok) {
      displayUsageChart(data);
    } else {
      alert("Error fetching usage data: " + data.error);
    }
  } catch (error) {
    alert("Error fetching usage data");
  }
}

/**
 * Displays the API usage data in a line chart
 * @param {Array} data - Array of objects with total_requests and date
 */
function displayUsageChart(data) {
  const ctx = document.getElementById("usageChart").getContext("2d");
  const labels = data.map((item) => item.date).reverse();
  const values = data.map((item) => item.total_requests).reverse();

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "API Requests",
          data: values,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Number of Requests",
          },
        },
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
      },
    },
  });
}
