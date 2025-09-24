/* eslint-disable max-len */
import { useContext } from 'react';
import styles from './Search.module.scss';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../../StoreProvider';
import { ProductsContext } from '../../../ProductsProvider';

export const Search = () => {
  const { isAddedToCart, isAddedToFavourites, addItemToCart, addItemToFavourites } =
    useContext(StoreContext);
  const { products } = useContext(ProductsContext);

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
              <NavLink to={`/product/${product.}`} className={styles.link}>
                <div className={styles.image}>
                  <img
                    className={styles.photo}
                    src={product.product.image}
                    alt={product.product.name}
                  />
                </div>

                <span className={styles.name}>{product.product.name}</span>
              </NavLink>
            </div>

            <span className={styles.price}>{`$${product.product.price}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
