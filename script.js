const apiKey = "cd206260bd96618a029960dce848dfb0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

    if (data.cod == "404") {  
        alert("City not found! Please enter a valid city.");
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

    let weatherCondition = data.weather[0].main.toLowerCase();
    let iconPath = "img/default.png"; // Default image

    if (weatherCondition.includes("cloud")) iconPath = "cloud.png";
    else if (weatherCondition.includes("clear")) iconPath = "clear.png";
    else if (weatherCondition.includes("rain")) iconPath = "rain.png";
    else if (weatherCondition.includes("drizzle")) iconPath = "drizzle.png";
    else if (weatherCondition.includes("mist") || weatherCondition.includes("haze")) iconPath = "mist.png";

    WeatherIcon.src = iconPath;
}

// ✅ Search button click event
searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

// ✅ Enter key press event
searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});

// ✅ Default city jab page load ho
window.onload = function() {
    checkWeather("Delhi");
};
