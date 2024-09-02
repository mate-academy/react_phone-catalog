import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/types';
import { useSearchParams } from 'react-router-dom';
import { ProductsContext } from '../../context/ProductsContext';
import { fetchProducts } from '../../servises/products';
import styles from './PhonesPage.module.scss';
import { Breadcrumbs } from '../../components/BradCrumbs';
import { Loader } from '../../components/Loader';
import { ProductList } from '../../components/ProductList';

export const PhonePage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSortActive, setIsSortActive] = useState(false);
  const [isPerPageActive, setIsPerPageActive] = useState(false);
  const { goods, updateGoods } = useContext(ProductsContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage');

  useEffect(() => {
    if (!goods?.length) {
      setIsLoading(true);
      fetchProducts()
        .then(data => updateGoods(data as Product[]))
        .catch(e => console.error(e))
        .finally(() => setIsLoading(false));
    }
  }, [goods, updateGoods]);

  useEffect(() => {
    if (goods?.length) {
      setPhones(goods.filter(good => good.category === 'phones'));
    }
  }, [goods]);

  const phonesAmount = useMemo(() => phones.length, [phones]);

  const sortByOptions = useMemo(
    () => [
      { name: 'Newest', value: 'age' },
      { name: 'Alphabetically', value: 'title' },
      { name: 'Cheapest', value: 'price' },
    ],
    [],
  );

  const itemsPerPageOptions = useMemo(() => ['4', '8', '16', 'All'], []);

  const onSortBySelected = (value: string) => {
    setIsSortActive(false);
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    setSearchParams(params);
  };

  const onPerPageSelected = (value: string) => {
    setIsPerPageActive(false);
    const params = new URLSearchParams(searchParams);
    if (value === 'All') {
      params.delete('perPage');
      params.delete('page');
    } else {
      params.set('perPage', value);
    }
    setSearchParams(params);
  };

  const sortedPhones = useMemo(() => {
    switch (sortBy) {
      case 'age':
        return phones.sort((a, b) => b.year - a.year);
      case 'title':
        return phones.sort((a, b) => b.name.localeCompare(a.name));
      case 'price':
        return phones.sort((a, b) => a.price - b.price);
      default:
        return phones;
    }
  }, [sortBy, phones]);

  return (
    <div className={styles.page}>
      <Breadcrumbs />
      <h1 className={styles.page__heading}>Mobile phones</h1>
      <p className={styles.page__amount}>{phonesAmount} models</p>
      <div className={styles.filters}>
        <div className={styles.filters__sort}>
          <div className={styles.dropdown}>
            <button
              className={styles.dropdown__trigger}
              onClick={() => setIsSortActive(!isSortActive)}
              onBlur={() => setIsSortActive(false)}
            >
              {sortByOptions.find(option => option.value === sortBy)?.name}
              <span
                className={`${styles.dropdown__icon} ${
                  isSortActive ? styles['dropdown__icon--up'] : styles['dropdown__icon--down']
                }`}
              ></span>
            </button>
            <div
              className={`${styles.dropdown__content} ${
                isSortActive ? styles['dropdown__content--active'] : ''
              }`}
            >
              <ul className={styles.dropdown__list}>
                {sortByOptions.map(option => (
                  <li
                    className={styles.dropdown__option}
                    key={option.value}
                    onClick={() => onSortBySelected(option.value)}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.filters__itemsPerPage}>
          <div className={styles.dropdown}>
            <button
              className={styles.dropdown__trigger}
              onClick={() => setIsPerPageActive(!isPerPageActive)}
              onBlur={() => setIsPerPageActive(false)}
            >
              {perPage || 'All'}
              <span
                className={`${styles.dropdown__icon} ${
                  isPerPageActive ? styles['dropdown__icon--up'] : styles['dropdown__icon--down']
                }`}
              ></span>
            </button>
            <div
              className={`${styles.dropdown__content} ${
                isPerPageActive ? styles['dropdown__content--active'] : ''
              }`}
            >
              <ul className={styles.dropdown__list}>
                {itemsPerPageOptions.map(option => (
                  <li
                    className={styles.dropdown__option}
                    key={option}
                    onClick={() => onPerPageSelected(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductList itemsPerPage={perPage ? +perPage : phonesAmount} items={sortedPhones} />
      )}
    </div>
  );
};
