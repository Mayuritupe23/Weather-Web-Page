document.querySelector('button').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city) {
        fetchWeather(city);
        fetchForecast(city);
    } else {
        alert('Please enter a city name');
    }
});

async function fetchWeather(city) {
    const apiKey = '771b6db8d8b269a8214db9793d936567';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

async function fetchForecast(city) {
    const apiKey = '771b6db8d8b269a8214db9793d936567';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temp').innerText = `${data.main.temp}°C`;
    document.getElementById('icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">`;
    document.getElementById('today').style.backgroundColor = "rgba(247, 243, 243, 0.265)"
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Clear previous forecast


    // Display forecast header
    const forecastHead = document.getElementById('forecasthead');
    // forecastHead.innerText = '5-Day Forecast';
    // forecastContainer.appendChild(forecastHead);

    // Process the forecast data (filter by midday data for clarity)
    const filteredData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    filteredData.forEach((forecast, index) => {
        const dayDiv = document.createElement('div');
        dayDiv.id = `day${index + 1}`;

        const date = new Date(forecast.dt_txt).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
        const temp = `Temp: ${forecast.main.temp}°C`;
        const icon = `<img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon">`;
        const weatherDescription = forecast.weather[0].description;

        dayDiv.innerHTML = `<h3>${date}</h3>${icon}<p>${temp}</p><p>${weatherDescription}</p>`;
        dayDiv.style.backgroundColor = "rgba(247, 243, 243, 0.265)"
        dayDiv.style.borderRadius = "8px"
        forecastContainer.appendChild(dayDiv);
    });
}