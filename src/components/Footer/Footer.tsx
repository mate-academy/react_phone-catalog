import { useEffect, useState } from 'react';

import { logo } from '../../assets';
import iconTop from '../../assets/images/arrow-right-primary.svg';

import styles from './Footer.module.scss';

export const Footer = () => {
  const [isScrollToTop, setIsScrollToTop] = useState(false);

  const handleScrollToTop = () => {
    setIsScrollToTop(true);
  };

  useEffect(() => {
    if (isScrollToTop) {
      setIsScrollToTop(false);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isScrollToTop]);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>

          <ul className={styles.socials}>
            <li className={styles.item}>
              <a className={styles.link} href="#">
                Github
              </a>
            </li>
            <li className={styles.item}>
              <a className={styles.link} href="#">
                Contacts
              </a>
            </li>
            <li className={styles.item}>
              <a className={styles.link} href="#">
                Rights
              </a>
            </li>
          </ul>

          <div className={styles.buttons}>
            <p className={styles.text}>Back to top</p>

            <button onClick={handleScrollToTop} className={styles.button}>
              <img src={iconTop} alt="icon" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
