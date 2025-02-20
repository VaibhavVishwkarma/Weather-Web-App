const apiKey = "cd206260bd96618a029960dce848dfb0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const WeatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

    if (data.cod == "404") {  // CHANGES HERE: Agar city galat ho to error handle kare
        alert("City not found! Please enter a valid city.");
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

    if (data.weather[0].main == "Clouds") {
        WeatherIcon.src = "img/cloud.png";
    }
    else if (data.weather[0].main == "Clear") {
        WeatherIcon.src = "img/clear.png";
    }
    else if (data.weather[0].main == "Rain") {
        WeatherIcon.src = "img/rain.png";
    }
    else if (data.weather[0].main == "Drizzle") {
        WeatherIcon.src = "img/drizzle.png";
    }
    else if (data.weather[0].main == "Mist") {
        WeatherIcon.src = "img/mist.png";
    }
}

// Search button click event
searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

// Enter key press event
searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});

// CHANGES HERE: Jab page load ho, default ek city ka weather dikhao
window.onload = function() {
    checkWeather("Delhi");  // CHANGES HERE: Default city set kiya
};
