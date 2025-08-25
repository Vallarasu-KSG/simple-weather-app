import React, { useState } from "react";
import "./Home.css";

import { FaSearch } from "react-icons/fa"; 

import Clouds from "../../Assets/Weather Icons/Clouds.png";
import Clear from "../../Assets/Weather Icons/clear-sky.png";
import Rain from "../../Assets/Weather Icons/heavy-rain.png";
import Drizzle from "../../Assets/Weather Icons/Drizzle.png";
import Mist from "../../Assets/Weather Icons/mist.png";

const apiKey = "68ea05349f9545da3c6b72ab16a382a2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  
  // ✅ Fetch Weather Data
  const checkWeather = async (cityName) => {
    try {
      const response = await fetch(`${apiUrl}${cityName}&appid=${apiKey}`);

      if (!response.ok) {
        setError("City not found");
        setWeather(null);
        return;
      }

      const data = await response.json();

      setWeather({
        name: data.name,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        condition: data.weather[0].main,
      });

      setError(""); // clear error
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setWeather(null);
    }
  };

  // ✅ Handle Search Click
  const handleSearch = () => {
    if (city.trim() === "") {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }
    checkWeather(city);
    setCity("");
  };

  // ✅ Map condition → icon
const getWeatherIcon = (condition) => {
  switch (condition) {
    case "Clouds": return Clouds;
    case "Clear": return Clear;
    case "Rain": return Rain;
    case "Drizzle": return Drizzle;
    case "Mist": return Mist;
    default: return Clear; // fallback
  }
};


  return (
    <div className="home">
      <div className="home__content">

        {/* 🏷️ Heading */}
        <h1 className="app__heading">🌦 Weather</h1>

        {/* 🔍 Search Box */}
        <div className="search">
          <input
            type="text"
            className="search__input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
          />
          <button className="search__btn" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        {/* ⚠️ Error Messages */}
        {error && <div className="message">{error}</div>}

        {/* 🌤️ Weather Info */}
        {weather && (
          <div className="weather">
            <img
              src={getWeatherIcon(weather.condition)}
              alt={weather.condition}
              className="weather__icon"
            />
            <h1 className="weather__temp">{weather.temp}°C</h1>
            <h2 className="weather__city">{weather.name}</h2>

            <div className="weather__details">
              <div className="weather__detail">
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/hygrometer.png"
                  alt="humidity"
                />
                <div>
                  <p className="weather__value">{weather.humidity}%</p>
                  <p className="weather__label">Humidity</p>
                </div>
              </div>

              <div className="weather__detail">
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/wind.png"
                  alt="wind"
                />
                <div>
                  <p className="weather__value">{weather.wind} km/h</p>
                  <p className="weather__label">Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;
