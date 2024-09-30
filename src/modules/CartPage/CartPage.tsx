import { FC } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import styles from './CartPage.module.scss';
import { useCatalog } from '../../contexts/CatalogProvider';
import { ProductCart } from './components/ProductCart';
import { EmptyCarts } from '../../components/EmptyCarts';

export const CartPage: FC = () => {
  const { carts, getTotalCheckout, getTotalQuantity, removeAllFromCart } =
    useCatalog();

  const totalItems = getTotalQuantity();
  const mainCheckout = getTotalCheckout();

  const handleCheckout = () => {
    const userResponse = confirm(
      'Checkout is not implemented yet, do you want to clear a cart?',
    );

    if (userResponse) {
      removeAllFromCart();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.productTop}>
        <Breadcrumbs />
        <h1 className={styles.title}>Cart</h1>
      </div>
      {!carts.length ? (
        <EmptyCarts />
      ) : (
        <>
          <div className={styles.cartWrapper}>
            <ul className={styles.list}>
              {carts.map(cart => {
                return <ProductCart cart={cart} key={cart.id} />;
              })}
            </ul>
            <div className={styles.chekout}>
              <h2 className={styles.mainPrice}>${mainCheckout}</h2>
              <div className={styles.totalItems}>
                {`Total for ${totalItems}  item${totalItems > 1 ? 's' : ''}`}
              </div>
              <div className={styles.divider}></div>
              <button className={styles.chekoutBtn} onClick={handleCheckout}>
                Chekout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
