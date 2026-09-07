import React from 'react';
import iconUp from '../../../../public/img/icons/icon-arrow-up.png';
import iconLogo from '../../../../public/img/icons/logo.svg';
import '../../styles/mixins.scss';
import styles from './footer.module.scss';
import '../../styles/main.scss';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    document.body.style.overflow = '';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__container} container`}>
        <img className={styles.footer__logo} src={iconLogo} alt="logo" />
        <nav
          className={`${styles.footer__navigation} ${styles['navigation-footer']}`}
        >
          <ul className={styles['navigation-footer__items']}>
            <li className={styles['navigation-footer__item']}>
              <a
                href="https://github.com/DeJisk"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
            <li className={styles['navigation-footer__item']}>Contacts</li>
            <li className={styles['navigation-footer__item']}>rights</li>
          </ul>
        </nav>
        <div className={styles.footer__buttons}>
          <button className={styles['footer__link-up']} onClick={scrollToTop}>
            Back to top
          </button>

          <button className={styles['footer__icon-up']} onClick={scrollToTop}>
            <img src={iconUp} alt="icon-up" />
          </button>
        </div>
      </div>
    </footer>
  );
};
