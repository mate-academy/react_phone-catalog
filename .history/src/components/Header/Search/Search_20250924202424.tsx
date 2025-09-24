/* eslint-disable max-len */
import { useContext } from 'react';
import styles from './Search.module.scss';
import { NavLink, useSearchParams } from 'react-router-dom';
import { ProductsContext } from '../../../ProductsProvider';

export const Search = () => {
  const { products } = useContext(ProductsContext);

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

      {query && }
    </div>
  );
};
