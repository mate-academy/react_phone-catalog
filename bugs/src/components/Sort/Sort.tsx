import React from 'react';
import styles from './Sort.module.scss';
import { useAppContext } from '../../context/AppContext';

type SortMethodTypes = "newest" | "alpha" | "price";

export const Sort: React.FC = () => {
  const {sortMethod, setSortMethod} = useAppContext();

  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortMethodTypes;
    setSortMethod(value);
  }

  return (
    <div>
      <div className={styles.label}>Sort by</div>
        <select onChange={handleMethodChange} className={styles.select} defaultValue={sortMethod}>
          <option value="newest">Newest</option>
          <option value="alpha">Alphabethically</option>
          <option value="price">Cheapest</option>
        </select>
    </div>
  );
};