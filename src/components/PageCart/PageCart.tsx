import styles from './PageCart.module.scss';

import stylesBtn from '../../styles/button.module.scss';
import { useAppSelector } from '../../app/hooks';
import { useContext, useState } from 'react';
import { translate } from '../../utils/translate';
import { LangContext } from '../../context/LangContext';
import { Link } from 'react-router-dom';
import { CartItem } from '../CartItem/CartItem';
import { Modal } from '../Modal/Modal';
import { Back } from '../Back';

export const PageCart = () => {
  const { lang } = useContext(LangContext);
  const { cartGoods } = useAppSelector(state => state.cart);
  const [checkout, setCheckout] = useState(false);
  const totalPrice = cartGoods.reduce(
    (acc, good) => acc + good.priceDiscount * good.quantity,
    0,
  );
  const totalitems = cartGoods.reduce((acc, good) => acc + good.quantity, 0);

  return (
    <div className={styles.cart}>
      {checkout && <Modal setCheckout={setCheckout} />}
      <Back />
      <h1 className={styles.cart__title}>{translate('link.cart', lang)}</h1>
      <div className={styles.cart__container}>
        <div className={styles.cart__items}>
          {cartGoods.length > 0 ? (
            cartGoods.map(prod => <CartItem key={prod.id} item={prod} />)
          ) : (
            <div className={styles.cart__empty}>
              <Link
                to={'/'}
                className={`${styles.cart__notFound__button} ${stylesBtn.button}`}
              >
                {translate('not-found.button', lang)}
              </Link>
              <img
                className={styles.cart__empty__img}
                src="img/cart-is-empty.png"
                alt="img cart-is-empty"
              />
            </div>
          )}
        </div>
        {cartGoods.length > 0 && (
          <div className={styles.cart__total}>
            <h2>{`$${totalPrice}`}</h2>
            <p
              className={styles.cart__total__text}
            >{`Total for ${totalitems} items`}</p>
            <div className={styles.cart__separator}></div>
            <button
              className={`${styles.cart__total__button} ${styles.card__button__add}`}
              onClick={() => setCheckout(prev => !prev)}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
