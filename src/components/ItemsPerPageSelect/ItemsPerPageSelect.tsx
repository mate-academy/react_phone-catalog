import React from 'react';
import styles from './ItemsPerPageSelect.module.scss';

interface Props {
  value: string; 
  onChange: (value: string) => void; 
}

export const ItemsPerPageSelect: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className={styles.perPage}>
      <label htmlFor="per-page-select" className={styles.perPage__label}>
        Items on page
      </label>
      
      <div className={styles['perPage__select-wrapper']}>
        <select  
          id="per-page-select" 
          className={styles.perPage__select} 
          value={value}
          onChange={(e) => onChange(e.target.value)} 
        >
          <option value="16">16</option>
          <option value="24">24</option>
          <option value="32">32</option>
          <option value="64">64</option>
        </select>

        <img 
         src="/react_phone-catalog/img/icons/arrow-downs.svg" 
          alt="Arrow down" 
          className={styles.perPage__arrow}
        />
      </div>
    </div>
  );
};
