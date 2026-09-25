import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import styles from './Search.module.scss';
import { Product } from '../../../../../../types/Product';
import { getProducts } from '../../../../../../utils/api';
import { Link } from 'react-router-dom';

export const Search = () => {
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [products, setProducts] = useState<Product[]>();
  const queryRef = useRef('');

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClearQueryAndValue = () => {
    setQuery('');
    setInputValue('');
  };

  const foundProducts = useMemo(() => {
    if (!query) {
      return [];
    }

    return products?.filter(product => {
      return product.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, products]);

  useEffect(() => {
    getProducts()
      .then(prod => setProducts(prod))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(inputValue);
      queryRef.current = inputValue;
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div
      className={styles.searchContainer}
      onBlur={e => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setQuery('');
        }
      }}
      onFocus={() => setQuery(queryRef.current)}
    >
      <input
        type="search"
        className={styles.search}
        value={inputValue}
        onChange={handleValueChange}
        placeholder="Search product"
      />

      {foundProducts && foundProducts.length > 0 && (
        <ul className={styles.productsList}>
          {foundProducts.slice(0, 3).map(product => (
            <li className={styles.productsItem} key={product.id}>
              <Link
                onClick={handleClearQueryAndValue}
                onMouseDown={e => e.preventDefault()}
                className={styles.productLink}
                to={`/product/${product.category}/${product.id}`}
              >
                <img
                  className={styles.prodImg}
                  src={product.image}
                  alt={product.name}
                />
                <div className={styles.prodInfo}>
                  <span className={styles.prodTitle}>{product.name}</span>
                  <span className={styles.prodPrice}>${product.price}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
