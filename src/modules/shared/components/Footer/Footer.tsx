import { NavLink } from 'react-router-dom';
import { FOOTER_LINKS } from '../../../../constants/categories/categories';
import style from './Footer.module.scss';
import { scrollToTop } from '../../../../utils/helpers/helpers';
import { useTheme } from '../../../../store/ThemeContext';
import { ICONS } from '../../../../assets/icons';

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={style.footer}>
      <div className={style.footer__container}>
        <img
          src={theme === 'dark' ? ICONS.logoDark : ICONS.logoLight}
          alt="logo"
          className={style.footer__logo}
          onClick={scrollToTop}
        />
        <nav className={style.footer__nav}>
          <ul className={style.footer__list}>
            {FOOTER_LINKS.map(link => (
              <li className={style.footer__item} key={link}>
                {link === 'github' ? (
                  <a
                    href="https://github.com/gallik-dev/react_phone-catalog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={style.footer__link}
                  >
                    {link}
                  </a>
                ) : (
                  <NavLink
                    to={link}
                    className={({ isActive }) =>
                      `${style.footer__link} ${isActive ? style.footer__link_active : ''}`
                    }
                  >
                    {link}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <button className={style.footer__btn} onClick={scrollToTop}>
          <p className={style.footer__btn__text}>Back to top</p>
          <span className={style.footer__btn__button}>
            <img
              src={theme === 'dark' ? ICONS.darkUpActive : ICONS.upActive}
              alt="arrow"
            />
          </span>
        </button>
      </div>
    </footer>
  );
};
