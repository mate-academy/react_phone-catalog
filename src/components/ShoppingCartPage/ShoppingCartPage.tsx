import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ShoppingCartPage.module.scss';

export const ShoppingCartPage = () => {
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const navigate = useNavigate();

  return (
    <section className={styles.cart}>
      <div className="container">
        <button
          className={styles['cart__back-btn']}
          onClick={() => {
            if (window.history.state && window.history.state.idx > 0) {
              navigate(-1);
            } else {
              navigate(`/${category}`);
            }
          }}
        >
          Back
        </button>
        <h1 className={styles.cart__title}>Cart</h1>
      </div>
    </section>
  );
};
