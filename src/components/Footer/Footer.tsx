import React from 'react';
import style from './Footer.module.scss';
import { Logo } from '../../shared/Logo/Logo';
import arrowTopImg from '../../shared/assets/icons/chevron-arrow-up.svg';

export const Footer: React.FC = () => {
  return (
    <div className={style.footer}>
      <div className={style.wrapper}>
        <div className={style.logo}>
          <Logo />
        </div>

        <div className={style.nav}>
          <ul className={style.navList}>
            <li className={style.navItem}>
              <a href="#" className={style.navLink}>
                Github
              </a>
            </li>

            <li className={style.navItem}>
              <a href="#" className={style.navLink}>
                Contacts
              </a>
            </li>

            <li className={style.navItem}>
              <a href="#" className={style.navLink}>
                Rights
              </a>
            </li>
          </ul>
        </div>

        <div className={style.backTop}>
          <div className={style.backTopContent}>
            <a href="#" className={style.backTopLink}>
              Back to top
              <div className={style.arrowTop}>
                <img src={arrowTopImg} alt="Arrow top icon" className={style.arrowTopIcon} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
