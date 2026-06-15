import { useNavigate } from 'react-router-dom';
import styles from './CartContent.module.scss';
import { CartItem } from '../CartItem/CartItem';

export const CartContent = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.container}>
        <button
          className={styles.backButton}
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            }
          }}
        >
          <img src="/img/icons/left.svg" alt="" className={styles.back} />
          Back
        </button>

        <h2 className={styles.title}>Cart</h2>
        <CartItem />
      </div>
    </div>
  );
};
