import React from 'react';
import styles from './SortSelect.module.scss';

interface Props {
  currentSort: string;
  onChange: (value: string) => void;
}

export const SortSelect: React.FC<Props> = ({ currentSort, onChange }) => {
  return (
    <div className={styles.sort}>
      <label htmlFor="sort-select" className={styles.sort__label}>
        Sort by
      </label>
      
    
      <div className={styles['sort__select-wrapper']}>
        <select  
          id="sort-select" 
          className={styles.sort__select} 
          value={currentSort}
          onChange={(e) => onChange(e.target.value)} 
        >
          <option value="age">Newest</option>
          <option value="title">Alphabetically</option>
          <option value="cheapest">Cheapest</option>
        </select>

        <img 
         src="/react_phone-catalog/img/icons/arrow-downs.svg" 
          alt="Arrow down" 
          className={styles.sort__arrow}
        />
      </div>
    </div>
  );
};
