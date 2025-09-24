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

      {/* <div className={styles.shortlist}>
        {cartItems.map(cartItem => (
          <div key={cartItem.id} className={styles.product}>
            <div className={styles.info}>
              <NavLink to={`/product/${cartItem.product.itemId}`} className={styles.link}>
                <div className={styles.image}>
                  <img
                    className={styles.photo}
                    src={cartItem.product.image}
                    alt={cartItem.product.name}
                  />
                </div>

                <span className={styles.name}>{cartItem.product.name}</span>
              </NavLink>
            </div>

            <span className={styles.price}>{`$${cartItem.product.price}`}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};
