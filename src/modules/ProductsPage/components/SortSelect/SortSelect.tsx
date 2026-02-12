// src/components/SortSelect/SortSelect.tsx

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './SortSelect.module.scss';

type SortSelectProps = {
  onSortChange: (sortValue: string) => void;
  value: string;
};

const SortSelect: React.FC<SortSelectProps> = ({ onSortChange, value }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectId = React.useId();

  const handleChange = (newSort: string) => {
    onSortChange(newSort);
    const params = new URLSearchParams(location.search);

    params.set('sort', newSort);
    navigate({ search: params.toString() }, { replace: true });
  };

  return (
    <div className={styles.sortSelectContainer}>
      <label htmlFor={selectId} className={styles.sortLabel}>
        Sort
      </label>

      <select
        id={selectId}
        value={value}
        onChange={e => handleChange(e.target.value)}
        className={styles.sortSelect}
      >
        <option value="age">Newest</option>
        <option value="title">Alphabetically</option>
        <option value="price">Cheapest</option>
      </select>
    </div>
  );
};

export default SortSelect;
