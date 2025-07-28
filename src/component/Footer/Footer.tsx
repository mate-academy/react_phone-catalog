import { Link } from 'react-router-dom';
import style from './Footer.module.scss';
import arrowUp from '../../assets/icons/Chevron (Arrow Right).png';
import Logo from '../../../public/img/Logo/Logo.png';

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
      <img src={Logo} className={style.footer__logo} />

      <ul className={style.footer__list}>
        {links.map(link => (
          <li key={link.title} className={style.footer__item}>
            <Link className={style.footer__link} to={link.path}>
              {link.title}
            </Link>
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
