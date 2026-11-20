import { ScrollToTop } from '../ScrollToTop';

import logo from '../../assets/logo.svg';

import styles from './Footer.module.scss';

const MENU_LIST = [
  { title: 'Github', path: '#github' },
  { title: 'Contacts', path: '#contacts' },
  { title: 'Rights', path: '#rights' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__logo}>
          <img
            src={logo}
            alt="Nice Gadgets"
            className={styles['footer__logo-image']}
          />
        </div>

        <ul className={styles.footer__menu}>
          {MENU_LIST.map(item => (
            <li key={item.path} className={styles['footer__menu-item']}>
              <a href={item.path} className={styles['footer__menu-link']}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        <ScrollToTop />
      </div>
    </footer>
  );
}
