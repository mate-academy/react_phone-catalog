import React, { useEffect } from 'react';
import styles from './DropDown.module.scss';
import { useAppContext } from '../../context/AppContext';

type DropDownProps = {
  numberOfProducts: number;
};

export const DropDown: React.FC<DropDownProps> = ({ numberOfProducts }) => {
  const { numberOfProductsPerPage, setNumberOfProductsPerPage } = useAppContext();

  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setNumberOfProductsPerPage(
      value === 'all' ? numberOfProducts : Number(value)
    );
  };

  useEffect(() => {
    localStorage.setItem('numberOfProductsPerPage', JSON.stringify(numberOfProductsPerPage));
  }, [numberOfProductsPerPage]);

  return (
    <div>
      <div className={styles.label}>Items per page</div>
      <select
        onChange={handleSelectionChange}
        className={styles.select}
        defaultValue={numberOfProductsPerPage}
      >
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="all">All</option>
      </select>
    </div>
  );
};
