import debounce from 'lodash.debounce';

import { useSearchParams } from 'react-router-dom';

import { useCallback, useContext, useEffect, useState } from 'react';
import { StateContext } from '../../Provider/GadgetsContext';

import styles from './SearchPage.module.scss';
import { ProductList } from '../../features/ProductList';

import productNotFound from '../../../public/img/product-not-found.png';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { products } = useContext(StateContext);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [appliedQuery, setAppliedQuery] = useState('');

  const query = searchParams.get('query') || '';

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  useEffect(() => {
    applyQuery(query);
  }, [query]);

  useEffect(() => {
    setFilteredProducts(
      products.filter(item =>
        item.name.toLowerCase().includes(appliedQuery.toLowerCase()),
      ),
    );
  }, [appliedQuery]);

  return (
    <main className={styles.search__page}>
      <div className="page-container">
        <h1 className={styles.search__title}>Search products</h1>
        {filteredProducts.length > 0 ? (
          <ProductList goods={filteredProducts} />
        ) : (
          <div className={styles.search__noMatch}>
            <p>There are no products matching the query "{appliedQuery}"</p>
            <img src={productNotFound} alt="" />
          </div>
        )}
      </div>
    </main>
  );
};
