import React, { useEffect } from 'react';
import styles from './DropDown.module.scss';
import { useAppContext } from '../../context/AppContext';
import { useHistory, useLocation } from 'react-router-dom';

type DropDownProps = {
  numberOfProducts: number;
};

export const DropDown: React.FC<DropDownProps> = ({ numberOfProducts }) => {
  const { numberOfProductsPerPage, setNumberOfProductsPerPage } =
    useAppContext();
  const history = useHistory();
  const location = useLocation();

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    const perPageValue = value === 'all' ? numberOfProducts : Number(value);

    setNumberOfProductsPerPage(perPageValue);
    localStorage.setItem(
      'numberOfProductsPerPage',
      JSON.stringify(perPageValue),
    );

    const searchParams = new URLSearchParams(location.search);
    if (perPageValue === numberOfProducts) {
      searchParams.delete('perPage');
    } else {
      searchParams.set('perPage', String(perPageValue));
    }

    if (searchParams.get('page') === '1') {
      searchParams.delete('page');
    }

    history.push({ search: searchParams.toString() });
  };

  useEffect(() => {
    const storedPerPage = localStorage.getItem('numberOfProductsPerPage');
    if (storedPerPage) {
      setNumberOfProductsPerPage(JSON.parse(storedPerPage));
    }
  }, [setNumberOfProductsPerPage]);

  return (
    <div className={styles.container}>
      <div className={styles.label}>Items per page</div>
      <select
        onChange={handleSelectionChange}
        className={styles.select}
        value={
          numberOfProductsPerPage === numberOfProducts
            ? 'all'
            : numberOfProductsPerPage
        }
      >
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="all">All</option>
      </select>
    </div>
  );
};
