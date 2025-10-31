document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
  const apiKey = "f8e71d29156d49d9ae3143319253010";
  const city = document.getElementById("locationInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name!</p>";
    return;
  }

  // Use HTTPS to avoid browser blocking
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `<p>❌ ${data.error.message}</p>`;
      return;
    }

    const { name, country } = data.location;
    const { temp_c, condition, feelslike_c } = data.current;

    resultDiv.innerHTML = `
      <h2>${name}, ${country}</h2>
      <img src="https:${condition.icon}" alt="${condition.text}" />
      <p><strong>${condition.text}</strong></p>
      <p>🌡 Temperature: ${temp_c}°C</p>
      <p>Feels like: ${feelslike_c}°C</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = "<p>⚠️ Network error. Try again.</p>";
    console.error(err);
  }
}
