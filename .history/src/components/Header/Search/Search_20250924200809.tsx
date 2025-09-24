/* eslint-disable max-len */
import { useContext } from 'react';
import styles from './Search.module.scss';
import { NavLink, useSearchParams } from 'react-router-dom';
import { ProductsContext } from '../../../ProductsProvider';

export const Search = () => {
  const { products } = useContext(ProductsContext);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const handleSearch = (newQuery: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', String(newSort));

    setSearchParams(params);
  };

  return (
    <div className={styles.searchlist}>
      <div className={styles.search}>
        <input type="text" placeholder="Search" className={styles.input} />
        <button className={styles.searchbutton}>
          <img src="images/Search.svg" alt="Search" className={styles.searchicon} />
        </button>
      </div>

      <div className={styles.shortlist}>
        {products.slice(0, 5).map(product => (
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
    </div>
  );
};
