import { NavLink } from 'react-router-dom';
import styles from './Cart.module.scss';
import { CartItem } from '../CartItem';
import { useContext } from 'react';
import { CartandFavContext } from '../CartandFavProvider';

export const Cart = () => {
  const { cart: products } = useContext(CartandFavContext);
  const itemsCounter = products.length;
  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  const productsWithoutDuplicates = products.filter(
    (product, index, arr) => index === arr.findIndex(p => p.id === product.id),
  );

  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <NavLink to="/" className={styles.pathHome}>
          <span className={styles.pathHome_title}>&lt;</span>
          <span className={styles.pathHome_title}>Back</span>
        </NavLink>

        <h1 className={styles.pageInfo_title}>Cart</h1>

        <div className={styles.pageItems}>
          <div className={styles.pageItems_list}>
            {productsWithoutDuplicates.map(product => {
              const counter = products.filter(
                item => item.itemId === product.itemId,
              ).length;

              return (
                <CartItem
                  key={product.id}
                  product={product}
                  counter={counter}
                />
              );
            })}
          </div>
          <div className={styles.pageItems_checkout}>
            <div className={styles.pageItems_checkout_info}>
              <span className={styles.pageItems_checkout_info_price}>
                {`$${totalPrice}`}
              </span>
              <span className={styles.pageItems_checkout_info_text}>
                {`Total for ${itemsCounter} items`}
              </span>
            </div>
            <div className={styles.pageItems_checkout_line}></div>
            <button className={styles.pageItems_checkout_button}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
