import { NavLink } from 'react-router-dom';
import style from './Footer.module.scss';
import classNames from 'classnames';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={style.footer}>
      <div className="container">
        <nav className={style.nav}>
          <NavLink to="/" className={style.nav__logo}>
            <img src="img/icons/logo.svg" alt="logo" />
          </NavLink>

          <ul className={style.nav__list}>
            <li className={style.nav__item}>
              <a
                href="https://github.com/nastia7408/react_phone-catalog"
                target="_blank"
                rel="noopener noreferrer"
                className={classNames(style.nav__link, 'uppercase')}
              >
                Github
              </a>
            </li>
            <li className={style.nav__item}>
              <a
                href="https://github.com/nastia7408"
                target="_blank"
                rel="noopener noreferrer"
                className={classNames(style.nav__link, 'uppercase')}
              >
                Contacts
              </a>
            </li>
            <li className={style.nav__item}>
              <a
                // eslint-disable-next-line max-len
                href="https://github.com/nastia7408/react_phone-catalog/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className={classNames(style.nav__link, 'uppercase')}
              >
                Rights
              </a>
            </li>
          </ul>

          <button
            type="button"
            className={style.nav__backToTop}
            onClick={handleScrollToTop}
          >
            <p className="small-text">Back to top</p>
            <div className={style.nav__backToTop__icon}>
              <img src="img/icons/top.svg" alt="arrow top" />
            </div>
          </button>
        </nav>
      </div>
    </footer>
  );
};
