/* eslint-disable max-len */
import { useAppDispatch, useAppSelector } from '../../../../api/hooks';
import BtnBack from '../../../../components/BtnBack/BtnBack';
import {
  addQuantity,
  minusQuantity,
  removeFromCart,
} from '../../../../features/cart/cartSlice';
import CartSum from '../CartSum/CartSum';
import styles from './CartList.module.scss';
import cartEmpty from '../../../../assets/images/cartPage/cart-is-empty.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CartList = () => {
  const cart = useAppSelector(state => state.cart.cartList);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleDelete = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleAddQuantity = (id: string) => {
    dispatch(addQuantity(id));
  };

  const handleMinusQuantity = (id: string) => {
    dispatch(minusQuantity(id));
  };

  return (
    <section className={styles.cart}>
      <BtnBack />
      <h1 className={styles.mainTitle}>{t('cart')}</h1>
      {cart.length === 0 ? (
        <img src={cartEmpty} alt="emptycart" />
      ) : (
        <div className={styles.cartContent}>
          <div className={styles.list}>
            {cart.map(el => (
              <div className={styles.item} key={el.id}>
                <div className={styles.left}>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(el.itemId)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.4714 4.4714C12.7318 4.21105 12.7318 3.78894 12.4714 3.52859C12.2111 3.26824 11.789 3.26824 11.5286 3.52859L8.00004 7.05719L4.47145 3.52859C4.2111 3.26824 3.78899 3.26824 3.52864 3.52859C3.26829 3.78894 3.26829 4.21105 3.52864 4.4714L7.05723 7.99999L3.52864 11.5286C3.26829 11.7889 3.26829 12.211 3.52864 12.4714C3.78899 12.7317 4.2111 12.7317 4.47145 12.4714L8.00004 8.9428L11.5286 12.4714C11.789 12.7317 12.2111 12.7317 12.4714 12.4714C12.7318 12.211 12.7318 11.7889 12.4714 11.5286L8.94285 7.99999L12.4714 4.4714Z"
                      ></path>
                    </svg>
                  </button>
                  <Link
                    to={`/${el.category}/` + `${el.itemId}`}
                    onClick={() => scrollTo(0, 0)}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <img src={el.image} alt="" className={styles.image} />
                    <p className={styles.title}>{el.name}</p>
                  </Link>
                </div>
                <div className={styles.right}>
                  <div className={styles.counter}>
                    <button
                      className={styles.minus}
                      onClick={() => handleMinusQuantity(el.itemId)}
                      disabled={el.quantity === 1 ? true : false}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.66602 7.99998C2.66602 7.63179 2.96449 7.33331 3.33268 7.33331H12.666C13.0342 7.33331 13.3327 7.63179 13.3327 7.99998C13.3327 8.36817 13.0342 8.66665 12.666 8.66665H3.33268C2.96449 8.66665 2.66602 8.36817 2.66602 7.99998Z"
                        ></path>
                      </svg>
                    </button>
                    <div className={styles.count}>{el.quantity}</div>
                    <button
                      className={styles.plus}
                      onClick={() => handleAddQuantity(el.itemId)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.66602 3.33335C8.66602 2.96516 8.36754 2.66669 7.99935 2.66669C7.63116 2.66669 7.33268 2.96516 7.33268 3.33335V7.33335H3.33268C2.96449 7.33335 2.66602 7.63183 2.66602 8.00002C2.66602 8.36821 2.96449 8.66669 3.33268 8.66669H7.33268V12.6667C7.33268 13.0349 7.63116 13.3334 7.99935 13.3334C8.36754 13.3334 8.66602 13.0349 8.66602 12.6667V8.66669H12.666C13.0342 8.66669 13.3327 8.36821 13.3327 8.00002C13.3327 7.63183 13.0342 7.33335 12.666 7.33335H8.66602V3.33335Z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <p className={styles.price}>${el.price}</p>
                </div>
              </div>
            ))}
          </div>
          <CartSum />
        </div>
      )}
    </section>
  );
};

export default CartList;
