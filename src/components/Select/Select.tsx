import React from 'react';
import styles from './Select.module.css';

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  'data-testid'?: string;
}

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  'data-testid': dataTestId = 'select',
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor="orderSelect" className={styles.label}>
        Ordenar por:
      </label>
      <select
        id="orderSelect"
        className={styles.select}
        value={value}
        onChange={e => onChange(e.target.value)}
        data-testid={dataTestId}
      >
        <option value="recent">Mais recentes</option>
        <option value="alphabetical">Em ordem alfabética</option>
        <option value="cheap">Mais barato</option>
      </select>
    </div>
  );
};

export default Select;
