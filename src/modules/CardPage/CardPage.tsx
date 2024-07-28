import styles from './CardPage.module.scss';
import { BackButton } from '../../components/BackButton';
import { useContext, useState } from 'react';
import { StateContext } from '../../Store';
import { CartCard } from '../../components/CartCard';
import { ModalCheckout } from '../ModalCheckout';

export const CartPage = () => {
  const state = useContext(StateContext);
  const { bascket, products } = state;
  const [isCheckout, setIsCheckout] = useState(false);

  let sum = 0;
  let total = 0;

  for (const item of bascket) {
    sum += item.price * item.quantity;
    total += item.quantity;
  }

  const hendleCheckout = () => {
    setIsCheckout(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <BackButton />
      </div>
      <h2 className={styles.title}>Cart</h2>

      {bascket.length > 0 ? (
        <div className={styles.mainBlocks}>
          <ul className={styles.list}>
            {products
              .filter(item =>
                bascket.find(bascketItem => bascketItem.itemId === item.itemId),
              )
              .map(item => (
                <li className={styles.listItem} key={item.id}>
                  <div className={styles.card}>
                    <CartCard
                      category={item.category}
                      itemId={item.itemId}
                      image={item.image}
                      name={item.name}
                      item={item}
                    />
                  </div>
                </li>
              ))}
          </ul>

          <div className={styles.total}>
            <div className={styles.totalSum}>
              <h1>{`$${sum}`}</h1>
            </div>
            <div className={styles.sum}>
              <p>{`Total for ${total} items`}</p>
            </div>
            <div className={styles.border}></div>
            <div className={styles.totalButton}>
              <button className={styles.totalCheckout} onClick={hendleCheckout}>
                Checkout
              </button>
            </div>
          </div>
          {isCheckout && <ModalCheckout setIsCheckout={setIsCheckout} />}
        </div>
      ) : (
        <div className={styles.empty}>
          <h1 className={styles.empty}>Your Cart is empty</h1>
        </div>
      )}
    </div>
  );
};
