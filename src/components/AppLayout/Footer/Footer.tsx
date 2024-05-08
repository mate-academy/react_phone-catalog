import {IoIosArrowUp} from 'react-icons/io';

import {Link} from 'react-router-dom';

import {useEffect, useState} from 'react';
import classNames from 'classnames';
import style from './Footer.module.scss';

export const Footer = () => {
  const [showButton, setShowButton] = useState(false);
  const [footerMenu, setFooterMenu] = useState(false);

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
          <Link
            className={style.footer__button}
            target="_blank"
            to="https://github.com/MykhailoLoniak"
          >
            Github
          </Link>
          <Link
            className={style.footer__button}
            target="_blank"
            to="https://t.me/MykhailoLoniak"
          >
            Contacts
          </Link>
          <Link className={style.footer__button} to="/">
            rights
          </Link>
        </div>
        <div>
          {showButton && (
            <button
              onClick={scrollToTop}
              type="button"
              aria-label="Go to top"
              className={classNames(style.footer__goTop, style.footer__button)}
            >
              Back to top
              <IoIosArrowUp className={style.footer__button_top} />
            </button>
          )}
        </div>
      </div>
      <div className={style.footer__mobi}>
        <Link
          className={style.footer__mobi__button}
          target="_blank"
          to="https://github.com/MykhailoLoniak"
          onClick={() => setFooterMenu(!footerMenu)}
        >
          Github
        </Link>
        <Link
          className={style.footer__mobi__button}
          target="_blank"
          to="https://t.me/MykhailoLoniak"
          onClick={() => setFooterMenu(!footerMenu)}
        >
          Contacts
        </Link>
        <Link
          className={style.footer__mobi__button}
          to="/"
          onClick={() => setFooterMenu(!footerMenu)}
        >
          rights
        </Link>
        {showButton && (
          <button
            onClick={scrollToTop}
            type="button"
            aria-label="Go to top"
            className={classNames(style.footer__goTop, style.footer__button)}
          >
            <IoIosArrowUp className={style.footer__button_top} />
          </button>
        )}
      </div>
    </div>
  );
};
