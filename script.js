const apiKey = "68ea05349f9545da3c6b72ab16a382a2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if (!response.ok) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".emptyInput").style.display = "none";
        return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    }

    // ✅ Hide errors when successful
    document.querySelector(".error").style.display = "none";
    document.querySelector(".emptyInput").style.display = "none";
    document.querySelector(".weather").style.display = "block";
}

searchbtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city === "") {
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".emptyInput").style.display = "block";
        return;
    }
    checkWeather(city);
});
