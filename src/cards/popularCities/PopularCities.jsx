import React from 'react';
import styles from './PopularCities.module.css';

export const PopularCities = ({ cities }) => {
    return (
        <div className={styles.citiesCard}>
            <h3 className={styles.title}>Popular Cities</h3>
            <div className={styles.citiesList}>
                {cities.map((city) => (
                    <div key={city.name} className={styles.cityItem}>
                        <span className={styles.cityName}>{city.name}</span>
                        <span className={styles.cityWeather}>{city.weather}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};