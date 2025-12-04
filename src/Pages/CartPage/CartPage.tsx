import { PageTop } from '../../components/PageTop';
import { useContext, useMemo } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { CartItem } from './CartItem';
import styles from './CartPage.module.scss';
import { PrimaryButton } from '../../components/PrimaryButton';

export const CartPage = () => {
  const { cartProducts } = useContext(CartContext);
  const totalAmount = useMemo(() => {
    return cartProducts.reduce((prev, product) => {
      return prev + (product.price ?? product.fullPrice) * product.quantity;
    }, 0);
  }, [cartProducts]);
  const totalLength = useMemo(() => {
    return cartProducts.reduce((prev, product) => {
      return prev + product.quantity;
    }, 0);
  }, [cartProducts]);

  return (
    <>
      <PageTop
        back={true}
        titleText="Cart"
        titleLevel="1"
        itemsContent={false}
        isBeadCrumbs={false}
      ></PageTop>
      <section className={styles['items-section']}>
        <main className={styles['items-main']}>
          <ul className={styles[`cart-item-list`]}>
            {cartProducts.map(product => {
              return (
                <li key={product.id}>
                  <CartItem item={product}></CartItem>
                </li>
              );
            })}
          </ul>

          <div className={styles['total-wrapper']}>
            <h2 className={styles['total-wrapper__title']}>${totalAmount}</h2>
            <span className={styles['total-wrapper__span']}>
              Total for {totalLength} items
            </span>
            <div className={styles['total-wrapper__line']}></div>
            <PrimaryButton isSelected={false} height="48" text="Checkout" />
          </div>
        </main>
      </section>
    </>
  );
};
