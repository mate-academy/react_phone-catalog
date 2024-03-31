import { IoIosArrowUp } from 'react-icons/io';

import { Link } from 'react-router-dom';

import style from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={style.footer}>
      <div className={style.footer__container}>
        <div className={style.footer__logo}>
          <Link to="/home">
            <img src="./img/svg/LOGO.svg" alt="logo" />
          </Link>
        </div>
        <div className={style.footer__menu}>
          <Link target="_blank" to="https://github.com/MykhailoLoniak">
            Github
          </Link>
          <Link target="_blank" to="https://t.me/MykhailoLoniak">
            Contacts
          </Link>
          <Link to="/">rights</Link>
        </div>
        <div className={style.footer__goTop}>
          Back to top
          <button
            onClick={scrollToTop}
            type="button"
            aria-label="Go to top"
            className={style.footer__button_top}
          >
            <IoIosArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
};
