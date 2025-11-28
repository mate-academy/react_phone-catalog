import React from 'react';
import styles from './ItemsPerPage.module.scss';

type ItensPerPageProps = {
  perPage: number;
  onChange: (newPerPage: number) => void;
  options?: number[];
};

export const ItensPerPage: React.FC<ItensPerPageProps> = ({
  perPage,
  onChange,
  options = [4, 8, 16, 24],
}) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}></span>

      <select
        className={styles.select}
        value={perPage}
        onChange={e => onChange(Number(e.target.value))}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
