import React from 'react';
import { Wind, Droplets } from 'lucide-react';
import styles from './CurrentWeather.module.css';

export const CurrentWeather = ({ location, current }) => {
  return (
    <div className={styles.mainCard}>
      <h2 className={styles.cityName}>
        {location.name}, {location.country}
      </h2>
      <p className={styles.localTime}>
        {location.localtime}
      </p>
      <div className={styles.weatherIcon}>
        <img 
          src={current.condition.icon} 
          alt={current.condition.text}
        />
      </div>
      <h1 className={styles.temperature}>{current.temp_c}°C</h1>
      <p className={styles.description}>{current.condition.text}</p>
      <div className={styles.weatherDetails}>
        <div className={styles.detailItem}>
          <Droplets size={20} />
          <span>{current.humidity}%</span>
        </div>
        <div className={styles.detailItem}>
          <Wind size={20} />
          <span>{current.wind_kph} km/h</span>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <div>Feels like: {current.feelslike_c}°C</div>
        <div>UV index: {current.uv}</div>
      </div>
    </div>
  );
};
