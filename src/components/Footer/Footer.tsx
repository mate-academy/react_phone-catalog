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
    <footer className={styles.Footer}>
      <div className={styles.Container}>
        <div className={styles.Content}>
          <div className={styles.Logo}>
            <img src={logo} alt="logo" />
          </div>

          <ul className={styles.Socials}>
            <li className={styles.FooterItem}>
              <a className={styles.Link} href="#">
                Github
              </a>
            </li>
            <li className={styles.FooterItem}>
              <a className={styles.Link} href="#">
                Contacts
              </a>
            </li>
            <li className={styles.FooterItem}>
              <a className={styles.Link} href="#">
                Rights
              </a>
            </li>
          </ul>

          <div className={styles.Buttons}>
            <p className={styles.Text}>Back to top</p>

            <button onClick={handleScrollToTop} className={styles.Button}>
              <img src={iconTop} alt="icon" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
