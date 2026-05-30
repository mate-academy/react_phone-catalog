import style from './Footer.module.scss';
import arrowUp from '../../assets/icons/Chevron (Arrow Right).png';
import Logo from '../../../public/img/Logo/Logo.png';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const links = [
    { title: 'GITHUB', path: 'https://github.com/Dvoris923' },
    { title: 'CONTACTS', path: 'https://github.com/Dvoris923' },
    { title: 'RIGHTS', path: 'https://github.com/Dvoris923' },
  ];

  return (
    <footer className={style.footer}>
      <NavLink to="/" className={style.header__logoLink}>
        <img src={Logo} className={style.footer__logo} />
      </NavLink>

      <ul className={style.footer__list}>
        {links.map(link => (
          <li key={link.title} className={style.footer__item}>
            <a
              className={style.footer__link}
              href={link.path}
              target="_blank"
              rel="noreferrer"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>

      <div className={style.footer__container}>
        <p className={style.footer__text}>Back to top</p>
        <img
          src={arrowUp}
          className={style.footer__arrow}
          onClick={scrollToTop}
        />
      </div>
    </footer>
  );
};
