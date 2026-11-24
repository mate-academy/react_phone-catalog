import { useTheme } from '../../hooks/useTheme';

import { ScrollToTop } from '../ScrollToTop';

import logoLight from '../../assets/logoLight.svg';
import logoDark from '../../assets/logoDark.svg';

import styles from './Footer.module.scss';

const MENU_LIST = [
  { title: 'Github', path: 'https://github.com/AlexanderOkhotnichenko' },
  { title: 'Contacts', path: 'https://github.com/AlexanderOkhotnichenko' },
  {
    title: 'Rights',
    path:
      'https://github.com/AlexanderOkhotnichenko' +
      '/react_phone-catalog/tree/develop',
  },
];

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__logo}>
          <img
            src={theme === 'light' ? logoDark : logoLight}
            alt="Nice Gadgets"
            className={styles['footer__logo-image']}
          />
        </div>

        <ul className={styles.footer__menu}>
          {MENU_LIST.map(item => (
            <li key={item.path} className={styles['footer__menu-item']}>
              <a
                href={item.path}
                className={styles['footer__menu-link']}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        <ScrollToTop text="Back to top" />
      </div>
    </footer>
  );
};
