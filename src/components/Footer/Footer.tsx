import styles from './Footer.module.scss';
import logoFooter from '/img/logo/Logo.png';
import arrowUp from '/icons/arrow-up-icon.png';
import React from 'react';

type FooterProps = {
  className?: string;
};

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`${styles.footer} ${className || ''}`}>
      <div className={styles.footer__container}>
        <div className={styles.logo_footer}>
          <img src={logoFooter} alt="logo" className={styles.logo_footer_img} />
        </div>

        <nav className={styles.footer_navigation}>
          <ul className={styles.footer_nav_list}>
            <li className={styles.footer_nav_item}>
              <a
                href="https://github.com/annaabramovaa"
                className={styles.footer_nav}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li className={styles.footer_nav_item}>
              <a
                href="https://github.com/annaabramovaa"
                className={styles.footer_nav}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contacts
              </a>
            </li>
            <li className={styles.footer_nav_item}>
              <a
                href="https://github.com/annaabramovaa"
                className={styles.footer_nav}
                target="_blank"
                rel="noopener noreferrer"
              >
                Rights
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.footer_backToTop}>
          <p className={styles.footer_btn_text}>Back to top</p>
          <button onClick={scrollToTop} className={styles.footer_btn}>
            <img src={arrowUp} alt="arrowUp" />
          </button>
        </div>
      </div>
    </div>
  );
};
