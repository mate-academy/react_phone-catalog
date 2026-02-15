import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navigation = [
    {
      href: 'https://github.com/D0dgerJ/react_phone-catalog/',
      name: 'Github',
    },
    {
      href: 'https://github.com/D0dgerJ',
      name: 'Contacts',
    },
    {
      href: 'https://github.com/D0dgerJ',
      name: 'Rights',
    },
  ];

  return (
    <footer className={styles.footer}>
      <a href="#" className={styles.footer__logoLink}>
        <img
          src={'./img/icons/logo.svg'}
          alt="logo"
          className={styles.footer__logoImg}
        />
      </a>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          {navigation.map(({ href, name }) => (
            <li key={name} className={styles.nav__item}>
              <NavLink to={href} target="_blank" className={styles.nav__link}>
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button className={styles.backToTop} onClick={scrollToTop}>
        <p className={styles.backToTop__text}>Back to top</p>
        <div className={styles.backToTop__button} />
      </button>
    </footer>
  );
};
