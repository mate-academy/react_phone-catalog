import { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Phone } from '../../types/Phone';
import { Tables } from '../../types/Tablets';
import { Accessoirs } from '../../types/Accesories';
import { SortType } from '../../types/SortType';

import './ReacrSelector.scss';
import styles from './CatalogPage.module.scss';

import { ProductList } from '../../components/ProductList';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { WentWrong } from '../../components/WentWrong';

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

export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<(Phone | Tables | Accessoirs)[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const filter = searchParams.get('sortBy');
  const perPage = searchParams.get('perPage');
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const allowedCategories = ['phones', 'tablets', 'accessories'];

    if (!allowedCategories.includes(category || '')) {
      navigate('/404', { replace: true });
    } else {
      setLoader(true);
      fetch(`/react_phone-catalog/api/${category}.json`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(() => setError(true))
        .finally(() => setLoader(false));
    }
  }, [category, navigate]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleSortByChange = (
    option: SingleValue<{ value: SortType; label: string }>,
  ) => {
    if (option) {
      if (option.value === SortType.Newest) {
        searchParams.delete('sortBy');
      } else {
        searchParams.set('sortBy', option.value);
      }

      setSearchParams(searchParams);
    }
  };

  const handlePerPageChange = (
    option: SingleValue<{ value: string; label: string }>,
  ) => {
    if (option) {
      if (option.value === 'all') {
        searchParams.delete('perPage');
      } else {
        searchParams.set('perPage', option.value);
      }

      setSearchParams(searchParams);
    }
  };

  return (
    <div className={styles.catalogPage}>
      {error ? (
        <WentWrong />
      ) : (
        <>
          <Breadcrumbs />
          <h1 className={styles.catalogPage__title}>{category}</h1>
          <span
            className={styles.catalogPage__modelCount}
          >{`${products.length} models`}</span>
          {products.length === 0 && !loader ? (
            <div>
              <h2>{`There are no ${category} yet`}</h2>
            </div>
          ) : (
            <div className={styles.catalogPage__sortGroup}>
              <div
                className={classNames(
                  styles.catalogPage__sort,
                  styles['catalogPage__sort--by'],
                )}
              >
                <span className={styles.catalogPage__selTitle}>Sort by</span>
                <Select
                  options={optionsSortBy}
                  classNamePrefix="reactSelectCustom"
                  defaultValue={
                    optionsSortBy.find(a => a.value === filter) ||
                    optionsSortBy[0]
                  }
                  isSearchable={false}
                  onChange={handleSortByChange}
                />
              </div>
              <div
                className={classNames(
                  styles.catalogPage__sort,
                  styles['catalogPage__sort--perPage'],
                )}
              >
                <span
                  className={`${styles.catalogPage__selTitle} ${styles.catalogPage__selTitle_large}`}
                >
                  Items on page
                </span>
                <Select
                  options={optionsCardCount}
                  classNamePrefix="reactSelectCustom"
                  defaultValue={
                    optionsCardCount.find(a => a.value === perPage) ||
                    optionsCardCount[0]
                  }
                  isSearchable={false}
                  onChange={handlePerPageChange}
                />
              </div>
            </div>
          )}
          <ProductList products={products} loader={loader} />
        </>
      )}
    </div>
  );
};
