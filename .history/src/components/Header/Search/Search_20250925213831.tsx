/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styles from './Search.module.scss';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { ProductsContext } from '../../../ProductsProvider';
import debounce from 'lodash.debounce';

export const Search = () => {
  const { products } = useContext(ProductsContext);

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');

  const query = searchParams.get('query') || '';

  const filteredByQuery = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  console.log(currentTheme);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSearch = useCallback(
    (newQuery: string) => {
      const params = new URLSearchParams(searchParams);

      if (newQuery.trim() === '') {
        params.delete('query');
      } else {
        params.set('query', newQuery);
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const debouncedSearch = useMemo(
    () => debounce((newQuery: string) => handleSearch(newQuery), 500),
    [handleSearch],
  );

  const showSearch = ['/phones', '/tablets', '/accessories'].some(path =>
    location.pathname.includes(path),
  );

  if (!showSearch) {
    return;
  }

  return (
    <div className={styles.searchlist}>
      <div className={styles.search}>
        <input
          value={inputValue}
          type="text"
          placeholder="Search"
          className={styles.input}
          onChange={event => {
            debouncedSearch(event.target.value);
            setInputValue(event.target.value);
          }}
        />
        <img
          src="images/Search.svg"
          alt="Search"
          className={styles.searchicon}
        />
      </div>

      {query &&
        (filteredByQuery.length > 0 ? (
          <div className={styles.shortlist}>
            {filteredByQuery.slice(0, 15).map(product => (
              <div key={product.id} className={styles.product}>
                <div className={styles.info}>
                  <NavLink
                    to={`/product/${product.itemId}`}
                    className={styles.link}
                  >
                    <div className={styles.image}>
                      <img
                        className={styles.photo}
                        src={product.image}
                        alt={product.name}
                      />
                    </div>

                    <span className={styles.name}>{product.name}</span>
                    <span className={styles.price}>{`$${product.price}`}</span>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.messagelist}>
            <span className={styles.message}>
              There are no products matching the query
            </span>
          </div>
        ))}
    </div>
  );
};
