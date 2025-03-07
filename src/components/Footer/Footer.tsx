import { Link } from 'react-router-dom';
import style from './Footer.module.scss';
import { Logo } from '../Logo/Logo';
import { translate } from '../../utils/translate';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';

export const Footer = () => {
  const { lang } = useContext(LangContext);

  return (
    <div className={style.footer}>
      <Logo />
      <nav className={style.footer__nav}>
        <ul className={style.footer__nav__list}>
          <li className={style.footer__list__item}>
            <Link
              to="https://github.com/AndreaTkachuk/react_phone-catalog/"
              className={style.nav__link}
            >
              Github
            </Link>
          </li>
          <li className={style.footer__list__item}>
            <Link
              to="mailto:andrii.tkachuk.fs@gmail.com"
              className={style.nav__link}
            >
              {translate('footer.link.contacts', lang)}
            </Link>
          </li>
          <li className={style.footer__list__item}>
            <Link
              to="https://github.com/AndreaTkachuk/react_phone-catalog/"
              className={style.nav__link}
            >
              {translate('footer.link.rights', lang)}
            </Link>
          </li>
        </ul>
      </nav>
      <div className={style.footer__backTop}>
        <p className="small-text">{translate('footer.button', lang)}</p>
        <div
          className="icon button button--back-top icon--back-top"
          onClick={() => window.scrollTo(0, 0)}
        ></div>
      </div>
    </div>
  );
};
