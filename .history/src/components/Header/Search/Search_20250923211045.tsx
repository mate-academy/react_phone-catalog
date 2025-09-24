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
    <div className={styles.search}>
      <input type="text" />
      <div className={styles.productslist}>
        {products.slice(0, 5).map(product => (
          <div key={product.id} className={styles.product}>
            <NavLink to={`/product/${product.itemId}`} className={styles.link}>
              <div className={styles.container}>
                <img className={styles.photo} src={product.image} alt={product.name} />
              </div>

              <span className={styles.name}>{product.name}</span>
            </NavLink>

            <div className={styles.description}>
              <div className={styles.price}>
                <span className={styles.newprice}>{`$${product.price}`}</span>
                <span className={styles.oldprice}>{`$${product.fullPrice}`}</span>
              </div>

              <hr />
              <span className={styles.outer}>
                <span className={styles.inner}>Screen</span>
                {product.screen}
              </span>
              <span className={styles.outer}>
                <span className={styles.inner}>Capacity</span>
                {product.capacity}
              </span>
              <span className={styles.outer}>
                <span className={styles.inner}>RAM</span>
                {product.ram}
              </span>
            </div>

            <div className={styles.buttons}>
              <button
                className={`${styles.addbutton} ${isAddedToCart(product.id) ? styles.active : ''}`}
                onClick={() => {
                  addItemToCart({ id: product.id, product, quantity: 1 });
                }}
              >
                {isAddedToCart(product.id) ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                className={styles.favorites}
                onClick={() => {
                  addItemToFavourites(product);
                }}
              >
                <img
                  src={
                    isAddedToFavourites(product.id)
                      ? 'images/Favourites Filled (Heart Like).svg'
                      : 'images/Favourites (Heart Like).svg'
                  }
                  alt="Favorites"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
