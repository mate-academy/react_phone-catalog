import { Logo } from '@components/Logo';
import { BackToTop } from '../BackToTop';

import styles from './Footer.module.scss';
import { useAppSelector } from '@store/hooks';
import classNames from 'classnames';
import { Theme } from '@sTypes/Theme';

const FOOTER_LINKS = ['Github', 'Contacts', 'Rights'];

export const Footer = () => {
  const theme = useAppSelector(state => state.theme);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__logo}>
          <Logo footer />
        </div>

        <div
          className={classNames(styles.footer__links, {
            [styles['footer__links--dark']]: theme === Theme.dark,
          })}
        >
          {FOOTER_LINKS.map(link => (
            <a
              key={link}
              className={styles.footer__link}
              href="https://github.com/maksym2493"
            >
              {link}
            </a>
          ))}
        </div>

        <div className={styles['footer__back-to-top']}>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
};
