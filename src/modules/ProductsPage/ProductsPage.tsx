import React, { useCallback, useEffect } from 'react';

import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useState } from 'react';
import { Product } from '../../types/Product';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { Loader } from '../../components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import { Search } from '../../components/Search/Search';
import { debounce } from 'lodash';
import styles from './ProductsPage.module.scss';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(query);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch('../../../public/api/products.json');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch products');
  //       }
  //       const data = await response.json();
  //       setProducts(data);
  //     } catch (error) {
  //       setError('Something went wrong. Please try again.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  useEffect(() => {
    setInputValue(query)
  }, [query]);


  const debouncedSetParams = useCallback(
    debounce((newParams: URLSearchParams) => {
      console.log('Debounced function executed')
      setSearchParams(newParams);
    }, 500),
    [setSearchParams]
  );

  useEffect(() => {
    return () => {
      debouncedSetParams.cancel();
    };
  }, [debouncedSetParams]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);

      const newParams = new URLSearchParams(searchParams.toString());

      if (value) {
        newParams.set('query', value);
      } else {
        newParams.delete('query');
      }

      debouncedSetParams(newParams);

    }, [searchParams, debouncedSetParams])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error}/>;
  }

  return (
    <div className="products-page">
      <Search value={inputValue} onChange={handleSearchChange} />
      {/* <h1>Products</h1>
      <div className={styles.productGrid}>
        {filteredProducts.length === 0 ? (
          <ErrorMessage message={error}/>
        ) : (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div> */}
    </div>
  );
};

export default ProductsPage;
