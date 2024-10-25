import { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from './CatalogPage.module.scss';
import './ReacrSelector.scss';
import { useLocation } from 'react-router-dom';
import { ProductList } from '../../components/productList/ProductList';
import { Phone } from '../../types/Phone';
import { Tables } from '../../types/Tablets';
import { Accessoirs } from '../../types/Accesories';
import { SortType } from '../../types/SortType';

export const CatalogPage: React.FC = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState<(Phone | Tables | Accessoirs)[]>([]);
  const [filter, setFilter] = useState<SortType | null>(SortType.Newest);

  const optionsSortBy = [
    { value: SortType.Newest, label: 'Newest' },
    { value: SortType.Alphabetically, label: 'Alphabetically' },
    { value: SortType.Cheapest, label: 'Cheapest' },
  ];

  const optionsCardCount = [
    { value: 'all', label: 'All' },
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
  ];

  useEffect(() => {
    fetch(
      `/https://yuron-maker.github.io/react_phone-catalog/api/${state.category}.json`,
    )
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [state.category]);

  let title;

  switch (state.category) {
    case 'phones':
      title = 'Mobile phones';
      break;
    case 'tablets':
      title = 'Tablets';
      break;
    case 'accessories':
      title = 'Accessories';
      break;
  }

  useEffect(() => {
    let filteredProducts = [...products];

    switch (filter) {
      case SortType.Alphabetically:
        filteredProducts = filteredProducts.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        break;
      case SortType.Cheapest:
        filteredProducts = filteredProducts.sort(
          (a, b) => a.priceDiscount - b.priceDiscount,
        );
        break;
    }

    setProducts(filteredProducts);
  }, [filter]);

  return (
    <div className={styles.catalogPage}>
      <h1 className={styles.catalogPage__title}>{title}</h1>
      <span
        className={styles.catalogPage__modelCount}
      >{`${products.length} models`}</span>
      <div className={styles.catalogPage__sortGroup}>
        <div className={styles.catalogPage__sort}>
          <span className={styles.catalogPage__selTitle}>Sort by</span>
          <Select
            options={optionsSortBy}
            classNamePrefix="reactSelectCustom"
            defaultValue={optionsSortBy[0]}
            isSearchable={false}
            onChange={option => setFilter(option?.value as SortType)}
          />
        </div>
        <div className={styles.catalogPage__sort}>
          <span
            className={`${styles.catalogPage__selTitle} ${styles.catalogPage__selTitle_large}`}
          >
            Items on page
          </span>
          <Select
            options={optionsCardCount}
            classNamePrefix="reactSelectCustom"
            defaultValue={optionsCardCount[0]}
            isSearchable={false}
          />
        </div>
      </div>
      <ProductList products={products} />
    </div>
  );
};
