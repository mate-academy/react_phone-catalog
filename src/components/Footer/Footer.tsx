import { NavLink } from 'react-router-dom';
import s from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={s.footer}>
      <div className={s.footer__container}>
        <NavLink to="/" className={s.footer__logo}>
          <picture>
            <source
              media="(max-width: 1199px)"
              srcSet="/img/icons/Logo-tab.svg"
            />
            <source
              media="(max-width: 639px)"
              srcSet="/img/icons/Logo-mob.svg"
            />
            <img src="/img/icons/Logo.png" alt="logo" />
          </picture>
        </NavLink>

        <ul className={s.footer__navigation}>
          <li className={s.footer__item}>
            <NavLink to="" className={s.footer__link}>
              GitHub
            </NavLink>
          </li>

          <li className={s.footer__item}>
            <NavLink to="" className={s.footer__link}>
              Contacts
            </NavLink>
          </li>

          <li className={s.footer__item}>
            <NavLink to="" className={s.footer__link}>
              Rights
            </NavLink>
          </li>
        </ul>

        <button className={s.footer__button} onClick={scrollToTop}>
          Back to top
          <span className={s['footer__button-wrapper']}>
            <img
              className={s['footer__button-img']}
              src="/img/icons/Arrow_up.png"
              alt="up button"
            />
          </span>
        </button>
      </div>
    </footer>
  );
};
