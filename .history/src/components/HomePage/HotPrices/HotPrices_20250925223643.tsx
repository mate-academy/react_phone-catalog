/* eslint-disable max-len */
import { useContext, useState } from 'react';
import styles from './HotPrices.module.scss';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../../StoreProvider';
import { ProductsContext } from '../../../ProductsProvider';
import { ThemeContext } from '../../../ThemeProvider';

export const HotPrices = () => {
  const { products, errorMessage } = useContext(ProductsContext);
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

  const hotPricesProducts = [...products].sort(
    (product1, product2) =>
      product2.fullPrice -
      product2.price -
      (product1.fullPrice - product1.price),
  );

  const handlePrevProduct = () => {
    setCurrentProduct(index => (index > 0 ? index - 1 : 0));
  };

  const handleNextProduct = () => {
    setCurrentProduct(index =>
      index < hotPricesProducts.length - 1
        ? index + 1
        : hotPricesProducts.length - 1,
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <h2 className={styles.title}>Hot prices</h2>

        <div className={styles.switchers}>
          <button
            className={styles.button}
            onClick={() => {
              handlePrevProduct();
            }}
            disabled={currentProduct === 0}
          >
            <img src="images/Vector Left.svg" />
          </button>

          <button
            className={styles.button}
            onClick={() => {
              handleNextProduct();
            }}
            disabled={currentProduct >= hotPricesProducts.length - 4}
          >
            <img src={th"images/Vector Right.svg"} />
          </button>
        </div>
      </div>

      {errorMessage === '' ? (
        <div className={styles.productsslider}>
          {hotPricesProducts
            .slice(currentProduct, currentProduct + 4)
            .map(product => (
              <div key={product.id} className={styles.product}>
                <NavLink
                  to={`/product/${product.itemId}`}
                  className={styles.link}
                >
                  <div className={styles.container}>
                    <img
                      className={styles.photo}
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  <span className={styles.name}>{product.name}</span>
                </NavLink>

                <div className={styles.description}>
                  <div className={styles.price}>
                    <span
                      className={styles.newprice}
                    >{`$${product.price}`}</span>
                    <span
                      className={styles.oldprice}
                    >{`$${product.fullPrice}`}</span>
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
                    {isAddedToCart(product.id)
                      ? 'Added to cart'
                      : 'Add to cart'}
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
                          : imglink
                      }
                      alt="Favorites"
                    />
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <h2 className={styles.error}>Unable to load products</h2>
      )}
    </div>
  );
};
