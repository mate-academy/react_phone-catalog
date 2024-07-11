// import { NavLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { topScroll } from '../../Functions/ScrolTop/topScrol';
import { GridContainer } from '../GridContainer';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={styles.container}>
      <GridContainer>
        <div className={styles.content}>
          <div className={styles.logo}>
            <NavLink to="/">
              <img
                src="img/icons/Logo.png"
                alt=""
                className="footer-logo_img"
              />
            </NavLink>
          </div>
          <div className={styles.link}>
            <a
              href="https://github.com/Eater228"
              target="_blank"
              rel="noreferrer"
            >
              GITHUB
            </a>{' '}
            {/*NavLink */}
            <a href="https://t.me/Eater1503" target="_blank" rel="noreferrer">
              CONTACTS
            </a>
            <a
              href="https://github.com/Eater228"
              target="_blank"
              rel="noreferrer"
            >
              RIGHTS
            </a>
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
