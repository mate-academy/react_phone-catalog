import { Link } from 'react-router-dom';
import styles from './ThirdBanner.module.scss';

export const ThirdBanner = () => {
  return (
    <div className={styles.thirdBanner}>
      <div className={styles.leftSection}>
        <div className={styles.background}>
          <div className={styles.topSide}>
            <div className={styles.textSection}>
              <h1 className={styles.backgroundTitle}>
                Now available in our store!
              </h1>
              <p className={styles.backgroundText}>Be the first</p>
            </div>
          </div>
          <div className={styles.bottomSide}>
            <Link to="/accessories" className={styles.orderButton}>
              order now
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.textSide}>
          <h2 className={styles.rightSectionTitle}>Apple Watch</h2>
          <h2 className={styles.rightSectionText}>Watch. Beyond.</h2>
        </div>
        <Link to="/accessories" className={styles.imgSide}>
          <img src="img/apple_watch_banner.png" alt="" />
        </Link>
      </div>
    </div>
  );
};
