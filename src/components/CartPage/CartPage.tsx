import { useContext } from 'react';
import Back from '../shared/Back';
import CartProduct from '../shared/CartProduct';
import styles from './CartPage.module.scss';
import { CartContext } from '../../contexts/CartContextProvider';

export interface CartType {
  id: number;
  image: string;
  name: string;
  price: number;
  count: number;
}

export const CartPage = () => {
  const { cartCards, setCartCards } = useContext(CartContext);

  const setNewCountForItem = (id: number, count: number) => {
    const found = cartCards.find(c => c.id === id);
    const foundInd = cartCards.findIndex(c => c.id === id);

    if (found) {
      found.count = count;

      setCartCards([
        ...cartCards.slice(0, foundInd),
        found,
        ...cartCards.slice(foundInd + 1, cartCards.length),
      ]);
    }
  };

  return (
    <main className={styles.cart}>
      <section className={styles.cart__back}>
        <Back />
      </section>

      <h1 className={styles.cart__title}>Cart</h1>

      <section className={styles.cart__items}>
        {cartCards.map(it => {
          return (
            <CartProduct
              key={it.id}
              cartItem={it}
              setNewCount={setNewCountForItem}
            />
          );
        })}
      </section>

      <section className={styles.cart__sum}>
        <div className={styles.cart__header}>
          <h2 className={styles['cart__title-purchase']}>
            $
            {cartCards.reduce(
              (prev, curr) => prev + curr.count * curr.price,
              0,
            )}
          </h2>

          <p className={styles['cart__title-total']}>
            Total for {cartCards.reduce((prev, curr) => prev + curr.count, 0)}
            {'  '}items
          </p>
        </div>

        <button className={styles.cart__button}>Checkout</button>
      </section>
    </main>
  );
};
