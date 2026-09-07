import styles from './Footer.module.scss';
import logo from '../../images/phone-catalog-logo-3x.png';
import arrow from '../../images/slider/arrow-left.png';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <img src={logo} alt="logo" className={styles.footer__logo} />
        <nav className="nav">
          <ul className={styles.nav__list}>
            <li>
              <a href="#" className={`uppercase ${styles.nav__link}`}>
                Github
              </a>
            </li>
            <li>
              <a href="#" className={`uppercase ${styles.nav__link}`}>
                Contacts
              </a>
            </li>
            <li>
              <a href="#" className={`uppercase ${styles.nav__link}`}>
                rights
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.footer__bottom}>
          <p className="small-text">Back to top</p>
          <button
            className={styles.arrow}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src={arrow} alt="" className={styles.arrow__image} />
          </button>
        </div>
      </div>
    </footer>
  );
};
