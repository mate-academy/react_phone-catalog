import { useCallback, useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import styles from './PhonesPage.module.scss';
// import { ProductsList } from '../shared/components/ProductsList';
import { Link } from 'react-router-dom';
import { getProducts } from '../shared/api';
import { Product } from '../shared/types';

const sortByOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetically', label: 'Alphabetically' },
  { value: 'cheapest', label: 'Cheapest' },
];

const onPageOptions = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

const customStyles: StylesConfig = {
  dropdownIndicator: (base, state) => ({
    ...base,
    transition: `0.2s`,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
  }),

  control: (base, state) => ({
    ...base,
    border: state.selectProps.menuIsOpen
      ? '1px solid #313237 !important'
      : undefined,
  }),
};

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [onPage, setOnPage] = useState('16');

  const reloadPage = () => {
    window.location.reload();
  };

  const getValueSortBy = useCallback(() => {
    return sortBy ? sortByOptions.find(s => s.value === sortBy) : '';
  }, [sortBy]);

  const getValueOnPage = useCallback(() => {
    return onPage ? onPageOptions.find(s => s.value === onPage) : '';
  }, [onPage]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeSortBy = useCallback((newValue: any) => {
    setSortBy(newValue.value);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeOnPage = useCallback((newValue: any) => {
    setOnPage(newValue.value);
  }, []);

  useEffect(() => {
    getProducts()
      .then(responce => {
        setPhones(
          responce.filter(
            (product: { category: string }) => product.category === 'phones',
          ),
        );
      })
      .catch(() => setErrorMessage(`Something went wrong`));
  }, []);

  return errorMessage ? (
    <div className={styles.reloadContainer}>
      <h1 className={styles.errorMsg}>{errorMessage}</h1>
      <button className={styles.reloadBtn} onClick={reloadPage}>
        Reload
      </button>
    </div>
  ) : (
    <div className={styles.phonesPage}>
      <div className={styles.path}>
        <Link to="/" className={styles.homeLink}>
          <div className={styles.pathHome}></div>
        </Link>

        <div className={styles.pathSeparator}></div>
        <p className={styles.pathName}>Phones</p>
      </div>

      <h1 className={styles.title}>Mobile phones</h1>
      <p className={styles.counter}>{phones.length} models</p>

      <div className={styles.dropDowns}>
        <div className={styles.dropDownContainerSortBy}>
          <p className={styles.dropDownTitle}>Sort by</p>
          <Select
            options={sortByOptions}
            onChange={onChangeSortBy}
            value={getValueSortBy()}
            isSearchable={false}
            styles={customStyles}
          />
        </div>

        <div className={styles.dropDownContainerOnPage}>
          <p className={styles.dropDownTitle}>Items on page</p>
          <Select
            options={onPageOptions}
            onChange={onChangeOnPage}
            value={getValueOnPage()}
            isSearchable={false}
            styles={customStyles}
          />
        </div>
      </div>

      {/* <ProductsList /> */}
    </div>
  );
};
