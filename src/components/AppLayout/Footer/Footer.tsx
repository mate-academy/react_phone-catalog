import {IoIosArrowUp} from 'react-icons/io';

import {Link} from 'react-router-dom';

import {useEffect, useState} from 'react';
import style from './Footer.module.scss';

export const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        <div>
          {showButton && (
            <button
              onClick={scrollToTop}
              type="button"
              aria-label="Go to top"
              className={style.footer__goTop}
            >
              Back to top
              <IoIosArrowUp className={style.footer__button_top} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
