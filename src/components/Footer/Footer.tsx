/* eslint-disable max-len */
import { NavLink } from 'react-router-dom';
import s from './Footer.module.scss';
import { ArrowUpSVG } from '../../assets/ArrowUpSVG';
import { LogoSVG } from '../../assets/LogoSVG';

export const Footer = () => {
  return (
    <footer className={`${s.footer} ${s.container}`}>
      <a href="#" className={`${s.footer__link} ${s.footer__front}`}>
        <LogoSVG />
      </a>
      <ul className={s.footer__list}>
        <li className={s.footer__item}>
          <a href="#" className={s.footer__link}>
            github
          </a>
        </li>
        <li className={s.footer__item}>
          <a href="#" className={s.footer__link}>
            contacts
          </a>
        </li>
        <li className={s.footer__item}>
          <a href="#" className={s.footer__link}>
            rights
          </a>
        </li>
      </ul>
      <div className={s.footer__back}>
        <NavLink to="home" className={s.footer__back}>
          <span>Back to top</span>
          <ArrowUpSVG />
        </NavLink>
      </div>
    </footer>
  );
};
