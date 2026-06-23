import { Link } from 'react-router-dom';
import style from './Footer.module.scss';

import logo from '../../../public/img/my-icon/logo.svg';
import whiteLogo from '../../../public/img/theme-dark/white-logo.svg';
import toTop from '../../../public/img/my-icon/back.svg';
import top from '../../../public/img/theme-dark/back.svg';
import { useContext } from 'react';
import { ThemeContext } from '../../provider/ThemeContextProvider';

export const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={style.footer}>
      <Link to={'/'} className={style.footer__logo}>
        <img
          className={style.footer__images}
          src={theme === 'white' ? logo : whiteLogo}
          alt="Nice gadgets logo"
        />
      </Link>
      <div className={style.footer__nav}>
        <a
          className={style.footer__link}
          href="https://github.com/DmytroPAvlichenko/react_phone-catalog"
        >
          Github
        </a>
        <a className={style.footer__link} href="#">
          Contacts
        </a>
        <a className={style.footer__link} href="#">
          Rights
        </a>
      </div>
      <div className={style.footer__buttons}>
        <p className={style.footer__text}>Back to top</p>
        <button
          className={style.footer__button}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            className={style.footer__icon}
            src={theme === 'white' ? toTop : top}
            alt="To-top"
          />
        </button>
      </div>
    </footer>
  );
};
