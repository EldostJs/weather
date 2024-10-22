import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar } from "./cards/searchBar/SearchBar.jsx";
import { CurrentWeather } from './cards/currentWeather/CurrentWeather.jsx';
import { WeatherMap } from './cards/weatherMap/WeatherMap.jsx';
import { PopularCities } from './cards/popularCities/PopularCities.jsx';
import { Forecast } from './cards/forecast/Forecast.jsx';
import styles from './App.module.css';

const API_KEY = '096bb3d057f540f69db62932241406';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Moscow');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popularCities, setPopularCities] = useState([
    { name: 'Delhi', weather: '' },
    { name: 'Mumbai', weather: '' },
    { name: 'Hyderabad', weather: '' },
    { name: 'Bengaluru', weather: '' },
    { name: 'Kolkata', weather: '' },
    { name: 'Paris', weather: '' },
    { name: 'Tokyo', weather: '' },
    { name: 'New York', weather: '' },
    { name: 'London', weather: '' }
  ]);

  const fetchWeatherData = async (cityName) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=3&aqi=yes&alerts=yes`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularCitiesData = async () => {
    try {
      const citiesData = await Promise.all(
        popularCities.map(city =>
          axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.name}`)
        )
      );
      setPopularCities(prevCities =>
        prevCities.map((city, index) => ({
          ...city,
          weather: citiesData[index].data.current.condition.text
        }))
      );
    } catch (err) {
      console.error('Error fetching popular cities:', err);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  useEffect(() => {
    fetchPopularCitiesData(); 

    const intervalId = setInterval(fetchPopularCitiesData, 10000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className={styles.container}>
      <SearchBar city={city} setCity={setCity} />
      {weatherData && (
        <div className={styles.grid}>
          <CurrentWeather
            location={weatherData.location}
            current={weatherData.current}
          />
          <div className={styles.mapContainer}>
            <WeatherMap
              lat={weatherData.location.lat}
              lon={weatherData.location.lon}
            />
            <Forecast forecast={weatherData.forecast.forecastday} />
          </div>
          <PopularCities cities={popularCities} />
        </div>
      )}
    </div>
  );
};

export default App;
