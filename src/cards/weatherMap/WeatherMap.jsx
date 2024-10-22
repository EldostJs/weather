import React from 'react';
import styles from './WeatherMap.module.css';

export const WeatherMap = ({ lat, lon }) => {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.1},${lat-0.1},${lon+0.1},${lat+0.1}&layer=mapnik`;

  return (
    <div className={styles.mapCard}>
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        className={styles.map}
        title="Weather Map"
      />
    </div>
  );
};