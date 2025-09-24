/* eslint-disable max-len */
import { useContext, useState } from 'react';
import styles from './ProductsSlider.module.scss';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../../StoreProvider';
import { ProductsContext } from '../../../ProductsProvider';

export const ProductsSlider = () => {
  const { products, errorMessage } = useContext(ProductsContext);
  const { isAddedToCart, isAddedToFavourites, addItemToCart, addItemToFavourites } =
    useContext(StoreContext);

  const [currentProduct, setCurrentProduct] = useState(0);

  const brandNewProducts = [...products].sort(
    (product1, product2) => product2.year - product1.year,
  );

  const handlePrevProduct = () => {
    setCurrentProduct(index => (index > 0 ? index - 1 : 0));
  };

  const handleNextProduct = () => {
    setCurrentProduct(index =>
      index < brandNewProducts.length - 1 ? index + 1 : brandNewProducts.length - 1,
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.upper}>
          <h2 className={styles.title}>Brand new models</h2>

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
              disabled={currentProduct >= brandNewProducts.length - 4}
            >
              <img src="images/Vector Right.svg" />
            </button>
          </div>
        </div>

        {errorMessage === '' ? (
          <div className={styles.productsslider}>
            {brandNewProducts.slice(currentProduct, currentProduct + 4).map(product => (
              <div key={product.id} className={styles.product}>
                <NavLink to={`/product/${product.itemId}`} className={styles.link}>
                  <div className={styles.container}>
                    <img className={styles.photo} src={product.image} alt="Product image" />
                  </div>

                  <span className={styles.name}>{product.name}</span>
                </NavLink>

                <div className={styles.description}>
                  <span className={styles.price}>{`$${product.price}`}</span>
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
        ) : (
          <h2 className={styles.error}>Unable to load products</h2>
        )}
      </div>
    </>
  );
};
