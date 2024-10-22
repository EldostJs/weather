import React from 'react';
import styles from './Forecast.module.css';

export const Forecast = ({ forecast }) => {
  return (
    <div className={styles.forecastCard}>
      <h3 className={styles.title}>3 day forecast</h3>
      <div className={styles.forecastList}>
        {forecast.map((day) => (
          <div key={day.date} className={styles.forecastItem}>
            <div className={styles.forecastDate}>
              {new Date(day.date).toLocaleDateString('en-En', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </div>
            <div className={styles.forecastWeather}>
              <img 
                src={day.day.condition.icon} 
                alt={day.day.condition.text}
                className={styles.forecastIcon}
              />
              <div className={styles.forecastTemp}>
                <span className={styles.maxTemp}>{day.day.maxtemp_c}°</span>
                <span className={styles.minTemp}>{day.day.mintemp_c}°</span>
              </div>
            </div>
            <div className={styles.forecastCondition}>
              {day.day.condition.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};