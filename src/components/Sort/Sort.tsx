import React, { useEffect } from 'react';
import styles from './Sort.module.scss';
import { useAppContext } from '../../context/AppContext';
import { useHistory, useLocation } from 'react-router-dom';

export type SortMethodTypes = "newest" | "alpha" | "price";

export const Sort: React.FC = () => {
  const { sortMethod, setSortMethod } = useAppContext();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sortFromUrl = params.get('sort') as SortMethodTypes;

    if (sortFromUrl) {
      setSortMethod(sortFromUrl);
    }
  }, [location.search, setSortMethod]);

  const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortMethodTypes;
    setSortMethod(value);

    const params = new URLSearchParams(location.search);
    params.set('sort', value);
    history.push({ search: params.toString() });

    localStorage.setItem('sortMethod', JSON.stringify(value));
  }

  return (
    <div className={styles.container}>
      <div className={styles.label}>Sort by</div>
      <select onChange={handleMethodChange} className={styles.select} value={sortMethod}>
        <option value="newest">Newest</option>
        <option value="alpha">Alphabetically</option>
        <option value="price">Cheapest</option>
      </select>
    </div>
  );
};
