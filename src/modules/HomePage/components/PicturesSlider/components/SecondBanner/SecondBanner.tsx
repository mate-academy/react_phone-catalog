import { Link } from 'react-router-dom';
import styles from './SecondBanner.module.scss';

export const SecondBanner = () => {
  return (
    <div className={styles.secondBanner}>
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
            <Link to="/tablets" className={styles.orderButton}>
              order now
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.textSide}>
          <h2 className={styles.rightSectionTitle}>iPad Pro</h2>
          <h2 className={styles.rightSectionText}>Pro. Beyond.</h2>
        </div>
        <Link to="/tablets" className={styles.imgSide}>
          <img src="img/ipad_pro_banner_version2.png" alt="" />
        </Link>
      </div>
    </div>
  );
};
