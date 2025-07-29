import { FC, useMemo, useState } from 'react';
import styles from './ShoppingCardPage.module.scss';
import { BackButton } from '../shared/BackButton';
import { useGlobalState } from '../../context/store';
import { CheckoutModal } from './components/CheckoutModal/CheckoutModal';
import { CardItem } from './components/CardItem';

export const ShoppingCartPage: FC = () => {
  //#region state & handlers
  const { cart } = useGlobalState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalAmount = useMemo(
    () =>
      cart.reduce(
        (initialAmount, cartItem) =>
          initialAmount + cartItem.product.price * cartItem.quantity,
        0,
      ),
    [cart],
  );

  const totalQuantity = useMemo(
    () =>
      cart.reduce((prevValue, curValue) => prevValue + curValue.quantity, 0),
    [cart],
  );
  //#endregion

  return (
    <div className={styles.cardBody}>
      <div className={styles.backBtn}>
        <BackButton />
      </div>

      {cart.length ? (
        <div className={styles.cardContent}>
          <h1 className={styles.cardTitle}>Card</h1>

          <ul className={styles.items}>
            {cart.map(item => (
              <CardItem key={item.id} cardItem={item} />
            ))}
          </ul>

          <div className={styles.cardTotal}>
            <div className={styles.cardTotalValues}>
              <span className={styles.cardTotaPrice}>{`$${totalAmount}`}</span>

              <span className={styles.cardTotaItems}>
                {totalQuantity === 1
                  ? `Total for ${totalQuantity} item`
                  : `Total for ${totalQuantity} items`}
              </span>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className={styles.checkoutBtn}
            >
              Checkout
            </button>

            {isModalOpen && <CheckoutModal setIsModalOpen={setIsModalOpen} />}
          </div>
        </div>
      ) : (
        <div className={styles.emptyCard}>
          <div className={styles.emptyCardText}>Your card is empty</div>

          <img
            src="\img\cart-is-empty.png"
            alt="card-is-empty"
            className={styles.emptyCardImg}
          />
        </div>
      )}
    </div>
  );
};
