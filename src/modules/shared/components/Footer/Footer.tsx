import React, { useCallback } from 'react';
import { icons } from '../../constants/icons';
import { Icon } from '../Icon/Icon';
import { Link } from 'react-router-dom';

import style from './Footer.module.scss';

export const Footer: React.FC = () => {
  const backToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className={style.footer}>
      <div className={style.footer__container}>
        <div className={style['footer__logo-container']}>
          <Icon icon={icons.logo} className={style.footer__logo} />
        </div>
        <div className={style.footer__items}>
          <Link
            to="/"
            className={style.footer__link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
          <Link
            to="/"
            className={style.footer__link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacts
          </Link>
          <Link
            to="/"
            className={style.footer__link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Rights
          </Link>
        </div>
        <div className={style.footer__block} onClick={backToTop}>
          <span className={style.footer__title}>Back to top</span>
          <button className={style.footer__button}>
            <Icon icon={icons.arrow_top} />
          </button>
        </div>
      </div>
    </div>
  );
};
