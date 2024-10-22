import React from 'react';
import styles from './SearchBar.module.css';

export const SearchBar = ({ city, setCity }) => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};