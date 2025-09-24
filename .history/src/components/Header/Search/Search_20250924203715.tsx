/* eslint-disable max-len */
import { useContext } from 'react';
import styles from './Search.module.scss';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { ProductsContext } from '../../../ProductsProvider';

export const Search = () => {
  const { products } = useContext(ProductsContext);

  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const filteredByQuery = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSearch = (newQuery: string) => {
    const params = new URLSearchParams(searchParams);

    if (newQuery.trim() === '') {
      params.delete('query');
    } else {
      params.set('query', newQuery);
    }

    setSearchParams(params);
  };

  const showSearch = ['/phones, /tablets']

  return (
    <div className={styles.searchlist}>
      <div className={styles.search}>
        <input
          value={query}
          type="text"
          placeholder="Search"
          className={styles.input}
          onChange={event => handleSearch(event.target.value)}
        />
        <img src="images/Search.svg" alt="Search" className={styles.searchicon} />
      </div>

      {query &&
        (filteredByQuery.length > 0 ? (
          <div className={styles.shortlist}>
            {filteredByQuery.slice(0, 5).map(product => (
              <div key={product.id} className={styles.product}>
                <div className={styles.info}>
                  <NavLink to={`/product/${product.itemId}`} className={styles.link}>
                    <div className={styles.image}>
                      <img className={styles.photo} src={product.image} alt={product.name} />
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
            <span className={styles.message}>There are no products matching the query</span>
          </div>
        ))}
    </div>
  );
};
