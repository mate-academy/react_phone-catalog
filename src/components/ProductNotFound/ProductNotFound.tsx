import { useNavigate } from 'react-router-dom';
import { AccentBtn } from '../AccentBtn';
import styles from './ProductNotFound.module.scss';

export const ProductNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageNotFound}>
      <h2 className={styles.h1}>
        Oooops! It seems we don&apos;t have this model
      </h2>

      <div className={styles.btn}>
        <AccentBtn text="Back to catalog" onClick={() => navigate(-1)} />
      </div>

      <div className={styles.imgWrap}>
        <img
          src="img/product-not-found.png"
          alt="page-not-found"
          className={styles.img}
        />
      </div>
    </div>
  );
};
