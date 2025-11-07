document.addEventListener("DOMContentLoaded", () => {
  const weatherForm = document.getElementById("weatherForm");
  const cityInput = document.getElementById("cityInput");
  const weatherDisplay = document.getElementById("weatherDisplay");
  const cityName = document.getElementById("cityName");
  const temperature = document.getElementById("temperature");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("windSpeed");
  const description = document.getElementById("description");
  const weatherIcon = document.getElementById("weatherIcon");

  weatherForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    try {
      const response = await fetch(`/api/weather?city=${city}`);
      const data = await response.json();

      if (response.ok) {
        cityName.textContent = data.city;
        temperature.textContent = `Temperature: ${data.temperature}°C`;
        humidity.textContent = `Humidity: ${data.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.windSpeed} m/s`;
        description.textContent = `Description: ${data.description}`;
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.icon}.png`;
        weatherIcon.alt = data.description;
        weatherDisplay.style.display = "block";
      } else {
        alert(data.error || "Failed to fetch weather data.");
        weatherDisplay.style.display = "none";
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("An error occurred while fetching weather data. Please try again.");
      weatherDisplay.style.display = "none";
    }
  });
});
