document.querySelector('button').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city) {
        fetchWeather(city);
        fetchForecast(city);
    } else {
        alert('Please enter a city name');
    }
});

const apiKey = '771b6db8d8b269a8214db9793d936567';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

function constructUrl(endpoint, city) {
    return `${baseUrl}/${endpoint}?q=${city}&appid=${apiKey}&units=metric`;
}

async function fetchWeather(city) {
    const url = constructUrl('weather', city);

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
    const url = constructUrl('forecast', city);

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
    const description = data.weather[0].description;

    document.getElementById('cityName').innerText = data.name;
    document.getElementById('icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">`;
    document.getElementById('temp').innerText = `${data.main.temp}°C`;
    document.getElementById('today').style.backgroundColor = "rgba(247, 243, 243, 0.265)";
  
    }   

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = ''; // Clear previous forecast

    const filteredData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    filteredData.forEach((forecast, index) => {
        const dayDiv = document.createElement('div');
        dayDiv.id = `day${index + 1}`;

        const date = new Date(forecast.dt_txt).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
        const temp = `Temp: ${forecast.main.temp}°C`;
        const icon = `<img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon">`;
        const weatherDescription = forecast.weather[0].description;

        dayDiv.innerHTML = `<h3>${date}</h3>${icon}<p>${temp}</p><p>${weatherDescription}</p>`;
        dayDiv.style.backgroundColor = "rgba(247, 243, 243, 0.265)";
        dayDiv.style.borderRadius = "8px";
        forecastContainer.appendChild(dayDiv);
    });
}
