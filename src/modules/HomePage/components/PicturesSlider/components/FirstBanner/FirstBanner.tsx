import { Link } from 'react-router-dom';
import styles from './FirstBanner.module.scss';

export const FirstBanner = () => {
  return (
    <div className={styles.firstBanner}>
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
            <Link to="/phones" className={styles.orderButton}>
              order now
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.textSide}>
          <h2 className={styles.rightSectionTitle}>iPhone 14 Pro</h2>
          <h2 className={styles.rightSectionText}>Pro. Beyond.</h2>
        </div>
        <Link to="/phones" className={styles.imgSide}>
          <img src="img/iphone_14pro_banner.png" alt="" />
        </Link>
      </div>
    </div>
  );
};
