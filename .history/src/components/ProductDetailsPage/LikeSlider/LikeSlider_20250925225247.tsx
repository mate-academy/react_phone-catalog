/* eslint-disable max-len */
import { useContext, useState } from 'react';
import styles from './LikeSlider.module.scss';
import { ProductsContext } from '../../../ProductsProvider';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../../StoreProvider';
import { ThemeContext } from '../../../ThemeProvider';

export const LikeSlider = () => {
  const { suggestedProducts } = useContext(ProductsContext);
  const {
    isAddedToCart,
    isAddedToFavourites,
    addItemToCart,
    addItemToFavourites,
  } = useContext(StoreContext);

  const { theme } = useContext(ThemeContext);

  const imglink =
    theme === 'dark'
      ? 'images/Favourites (Heart Like) Dark.svg'
      : 'images/Favourites (Heart Like).svg';

  const [currentProduct, setCurrentProduct] = useState(0);

  const handlePrevProduct = () => {
    setCurrentProduct(index => (index > 0 ? index - 1 : 0));
  };

  const handleNextProduct = () => {
    setCurrentProduct(index =>
      index < suggestedProducts.length - 1
        ? index + 1
        : suggestedProducts.length - 1,
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <h2 className={styles.title}>You may also like</h2>

        <div className={styles.switchers}>
          <button
            className={styles.button}
            onClick={() => {
              handlePrevProduct();
            }}
            disabled={currentProduct === 0}
          >
            <img src={
                theme === 'dark'
                  ? 'images/Chevron (Arrow Left).svg'
                  : 'images/Vector Left.svg'
              } />
          </button>

          <button
            className={styles.button}
            onClick={() => {
              handleNextProduct();
            }}
            disabled={currentProduct >= suggestedProducts.length - 4}
          >
            <img src={
                theme === 'dark'
                  ? 'images/Chevron (Arrow Right).svg'
                  : 'images/Vector Right.svg'
              } />
          </button>
        </div>
      </div>
      <div className={styles.productsslider}>
        {suggestedProducts
          .slice(currentProduct, currentProduct + 4)
          .map(suggestedProduct => (
            <div key={suggestedProduct.id} className={styles.product}>
              <NavLink
                to={`/product/${suggestedProduct.itemId}`}
                className={styles.link}
              >
                <div className={styles.container}>
                  <img
                    className={styles.photo}
                    src={suggestedProduct.image}
                    alt={suggestedProduct.name}
                  />
                </div>

                <span className={styles.name}>{suggestedProduct.name}</span>
              </NavLink>

              <div className={styles.description}>
                <div className={styles.price}>
                  <span
                    className={styles.newprice}
                  >{`$${suggestedProduct.price}`}</span>
                  <span
                    className={styles.oldprice}
                  >{`$${suggestedProduct.fullPrice}`}</span>
                </div>

                <hr />
                <span className={styles.outer}>
                  <span className={styles.inner}>Screen</span>
                  {suggestedProduct.screen}
                </span>
                <span className={styles.outer}>
                  <span className={styles.inner}>Capacity</span>
                  {suggestedProduct.capacity}
                </span>
                <span className={styles.outer}>
                  <span className={styles.inner}>RAM</span>
                  {suggestedProduct.ram}
                </span>
              </div>

              <div className={styles.buttons}>
                <button
                  className={`${styles.addbutton} ${isAddedToCart(suggestedProduct.id) ? styles.active : ''}`}
                  onClick={() => {
                    addItemToCart({
                      id: suggestedProduct.id,
                      product: suggestedProduct,
                      quantity: 1,
                    });
                  }}
                >
                  {isAddedToCart(suggestedProduct.id)
                    ? 'Added to cart'
                    : 'Add to cart'}
                </button>
                <button
                  className={styles.favorites}
                  onClick={() => {
                    addItemToFavourites(suggestedProduct);
                  }}
                >
                  <img
                    src={
                      isAddedToFavourites(suggestedProduct.id)
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
