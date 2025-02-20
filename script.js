const apiKey = "cd206260bd96618a029960dce848dfb0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const WeatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);  

    if (data.cod == "404") {  
        alert("City not found! Please enter a valid city.");
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

    let weatherCondition = data.weather[0].main.toLowerCase(); 
    console.log("Weather Condition:", weatherCondition);  // 

    if (weatherCondition === "clouds") {
        WeatherIcon.src = "cloud.png"; 
    } 
    else if (weatherCondition === "clear") {
        WeatherIcon.src = "clear.png"; 
    } 
    else if (weatherCondition === "rain") {
        WeatherIcon.src = "rain.png"; 
    } 
    else if (weatherCondition === "drizzle") {
        WeatherIcon.src = "drizzle.png"; 
    } 
    else if (weatherCondition === "mist") {
        WeatherIcon.src = "mist.png"; 
    } 
    else {
        WeatherIcon.src = "default.png";  
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

window.onload = function() {
    checkWeather("Delhi");  
};
