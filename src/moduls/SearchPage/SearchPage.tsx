import debounce from 'lodash.debounce';

import { useSearchParams } from 'react-router-dom';

import { useCallback, useContext, useEffect, useState } from 'react';
import { StateContext } from '../../Provider/GadgetsContext';

import styles from './SearchPage.module.scss';
import { ProductList } from '../../features/ProductList';

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
    <main>
      <div className="page-container">
        <ProductList goods={filteredProducts} />
      </div>
    </main>
  );
};
