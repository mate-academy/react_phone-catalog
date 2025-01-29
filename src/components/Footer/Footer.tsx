import React from 'react';

import style from './Footer.module.scss';
import { Logo } from '../Logo/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <Logo className={style.footer__logo} />

      <nav className={style.footer__nav}>
        <ul className={style.footer__nav_list}>
          <li className={style.footer__nav_item}>
            <a href="#" className={style.footer__nav_link}>
              GitHub
            </a>
          </li>
          <li className={style.footer__nav_item}>
            <a href="#" className={style.footer__nav_link}>
              Contacts
            </a>
          </li>
          <li className={style.footer__nav_item}>
            <a href="#" className={style.footer__nav_link}>
              Rights
            </a>
          </li>
        </ul>
      </nav>

      <div className={style.footer__back}>
        <p className={style.footer__back_text}>Back to top</p>
        <button
          className={style.footer__back_button}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        ></button>
      </div>
    </footer>
  );
};
