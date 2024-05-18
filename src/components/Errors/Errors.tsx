import { useNavigate } from 'react-router-dom';
import { AccentBtn } from '../AccentBtn';
import styles from './Errors.module.scss';

export const ErrorSomethingWrong = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.error}>
      <p className={styles.noProductsError}>Something went wrong &#128562;</p>
      <span className={styles.errorBtn}>
        <AccentBtn text="Reload" onClick={() => navigate('.')} />
      </span>
    </div>
  );
};

export const ErrorNoProducts = () => {
  return (
    <div className={styles.error}>
      <p className={styles.noProductsError}>
        There are no products yet &#128562;
      </p>
    </div>
  );
};

export const ErrorNoProductsFav = () => {
  return (
    <div className={styles.error}>
      <p className={styles.noProductsError}>
        Your favorite products will be collected here &#128521;
      </p>
    </div>
  );
};

export const ErrorEmptyCart = () => {
  return (
    <div className={styles.error}>
      <p className={styles.noProductsError}>Your cart is empty &#129402;</p>
    </div>
  );
};
