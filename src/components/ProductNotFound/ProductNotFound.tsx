import { useLocation, useNavigate } from 'react-router-dom';
import { AccentBtn } from '../AccentBtn';
import styles from './ProductNotFound.module.scss';

export const ProductNotFound = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div className={styles.pageNotFound}>
      <h2 className={styles.h1}>
        Oooops! It seems we don&apos;t have this model
      </h2>

      <div className={styles.btn}>
        <AccentBtn
          text="Back to catalog"
          onClick={() => navigate(state?.pathname || '/', { replace: true })}
        />
      </div>

      <div className={styles.imgWrap}>
        <img
          src="img/product-not-found.png"
          alt="product-not-found"
          className={styles.img}
        />
      </div>
    </div>
  );
};
