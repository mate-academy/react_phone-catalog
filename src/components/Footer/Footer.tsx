import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import figmaLogo from '../../../public/img/Icons/Logo.svg';
// eslint-disable-next-line max-len
import toTop from '../../../public/img/Icons/arrow-top-Icon.svg';

export const Footer = () => {
  return (
    <div className={styles.footerBlock}>
      <div className={styles.footerContainer}>
        <div className={styles.logoContainer}>
          <Link to="/" className={styles.logoLink}>
            <img
              src={figmaLogo}
              alt="NiceGadgets logo"
              className={styles.logo}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </Link>
        </div>

        <div className={styles.footerLinks}>
          <a
            target="_blank"
            href="https://github.com/Moddderi"
            className={styles.link}
            rel="noreferrer"
          >
            Github
          </a>
          <a
            target="_blank"
            href="https://github.com/Moddderi"
            className={styles.link}
            rel="noreferrer"
          >
            Contacts
          </a>

          <a
            target="_blank"
            href="https://github.com/Moddderi"
            className={styles.link}
            rel="noreferrer"
          >
            Rights
          </a>
        </div>

        <div className={styles['backToTop-container']}>
          <div className={styles.buttonBox}>
            <div
              className={styles.buttonName}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to top
            </div>
          </div>

          <div
            className={`${styles.button} hasShadow`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img className={styles.arrowTop} src={toTop} alt="toTopIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};
