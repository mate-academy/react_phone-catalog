// .. Footer.tsx
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

import arrowLeft from '/icons/chevron.svg';
import logo from '/icons/logo.svg';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // саме цей параметр відповідає за плавність
    });
  };

  return (
    <section className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.logo}>
            <Link to="/" className={styles.logoLink}>
              <img src={logo} alt="Nice gadgets" className={styles.logoImage} />
            </Link>
          </div>
          <ul className={styles.list}>
            <li className={styles.item}>
              <a
                className={styles.link}
                href="https://github.com/alexsand-r"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li className={styles.item}>
              <a
                className={styles.link}
                href="https://t.me/olexsand_r"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contacts
              </a>
            </li>
            <li className={styles.item}>
              <a className={styles.link} href="#" target="_blank">
                rights
              </a>
            </li>
          </ul>
          <div className={styles.action}>
            <p className={styles.text}>Back to top</p>
            <button type="button" className={styles.btn} onClick={scrollToTop}>
              <img src={arrowLeft} alt="button top" className={styles.image} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
