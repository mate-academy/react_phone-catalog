import classNames from 'classnames';

import styles from './Footer.module.scss';
import { Logo } from '../../components/Logo';

export const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__content}>
          <Logo className={styles.footer__logo} />

          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
              <a
                href="https://github.com/IrbisKronos"
                target="_blank"
                rel="noreferrer"
                className={styles.footer__link}
              >
                Github
              </a>
            </li>

            <li className={styles.footer__item}>
              <a
                href="https://github.com/IrbisKronos"
                target="_blank"
                rel="noreferrer"
                className={styles.footer__link}
              >
                Contacts
              </a>
            </li>

            <li className={styles.footer__item}>
              <a
                href="https://github.com/IrbisKronos"
                target="_blank"
                rel="noreferrer"
                className={styles.footer__link}
              >
                rights
              </a>
            </li>
          </ul>

          <div className={styles.footer__actions}>
            <button onClick={handleScrollTop} className={styles['back-to-top']}>
              Back to top
              <span
                className={classNames(
                  'icon',
                  'icon--arrow',
                  styles['back-to-top__icon'],
                )}
              ></span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
