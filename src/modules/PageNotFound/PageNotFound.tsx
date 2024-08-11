import { useNavigate } from 'react-router-dom';
import { AccentBtn } from '../../components/AccentBtn';
import styles from './PageNotFound.module.scss';

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageNotFound}>
      <h1 className={styles.h1}>Oooops! Something went wrong</h1>

      <div className={styles.btn}>
        <AccentBtn text="Back home" onClick={() => navigate('/')} />
      </div>

      <div className={styles.imgWrap}>
        <img
          src="img/page-not-found.png"
          alt="product-not-found"
          className={styles.img}
        />
      </div>
    </div>
  );
};
