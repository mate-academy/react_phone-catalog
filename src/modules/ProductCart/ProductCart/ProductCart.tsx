import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ProductCart.module.scss';
import { useAppSelector } from '../../shared/hooks/hooks';
import { ProductCartDetails } from '../ProductCartDetails';

export const ProductCart = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { cartItem } = useAppSelector(state => state.selectedProduct);

  const goBack = () => {
    navigate({
      pathname: '..',
      search,
    });
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart__location}>
        <span className={styles.cart__arrow}></span>
        <a
          className={styles.cart__back}
          onClick={e => {
            e.preventDefault();
            goBack();
          }}
        >
          Back
        </a>
      </div>
      <h1 className={styles.cart__title}>Cart</h1>
      {cartItem.length ? (
        <ProductCartDetails />
      ) : (
        <div className={styles.page}>
          <img
            src="/img/cart-is-empty.png"
            className={styles.page__img}
            alt="img"
          />
        </div>
      )}
    </div>
  );
};
