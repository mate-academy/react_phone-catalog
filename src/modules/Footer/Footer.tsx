import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import arrowUp from '../../images/icons/Arrow Up.png';
import Logo from '../../images/icons/Logo.png';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const links = [
    { title: 'GITHUB', path: '#' },
    { title: 'CONTACTS', path: '#' },
    { title: 'RIGHTS', path: '#' },
  ];

  return (
    <footer className={styles.footer}>
      <img src={Logo} className={styles.footer__logo} />

      <ul className={styles.footer__list}>
        {links.map(link => (
          <li key={link.title} className={styles.footer__item}>
            <Link className={styles.footer__link} to={link.path}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.footer__container}>
        <p className={styles.footer__text}>Back to top</p>
        <img
          src={arrowUp}
          className={styles.footer__arrow}
          onClick={scrollToTop}
        />
      </div>
    </footer>
  );
};
