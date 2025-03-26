import React from 'react';
import style from './Footer.module.scss';
import footerLogo from '../../shared/icons/logo.png';
import arrowTopImg from '../../shared/icons/chevron-arrow-up.svg';
import { Link } from 'react-router-dom';
import { ScrollToTop } from '@/utils/ScrollToTop';

export const Footer: React.FC = () => {
  return (
    <div className={style.footer}>
      <div className={style.wrapper}>
        <Link to='/' className={style.logo}>
          <img src={footerLogo} alt="Foter logo" />
        </Link>

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
            <button className={style.backTopLink} onClick={ScrollToTop}>
              Back to top
              <div className={style.arrowTop}>
                <img src={arrowTopImg} alt="Arrow top icon" className={style.arrowTopIcon} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
