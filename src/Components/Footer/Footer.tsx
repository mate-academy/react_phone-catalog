// import { NavLink } from 'react-router-dom';
import { topScroll } from '../../Functions/ScrolTop/topScrol';
import { GridContainer } from '../GridContainer';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={styles.container}>
      <GridContainer>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img src="img/icons/Logo.png" alt="" className="footer-logo_img" />
          </div>
          <div className={styles.link}>
            <a href="#">GITHUB</a> {/*NavLink */}
            <a href="#">CONTACTS</a>
            <a href="#">RIGHTS</a>
          </div>
          <div className={styles.backToTop}>
            <h2 className={styles.btnTitle}>Back to top </h2>
            <button className={styles.btn} onClick={topScroll}>
              <span>
                <img src="img/icons/Arrow_Up.svg" alt="" />
              </span>
            </button>
          </div>
        </div>
      </GridContainer>
    </div>
  );
};
