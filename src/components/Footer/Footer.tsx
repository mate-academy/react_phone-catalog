import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import React from 'react';

export const Footer = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <Link to="/" className="footer__logo" onClick={handleScrollTop}>
        <img
          src="./img/icons/footer-logo.svg"
          alt="Logo"
          className="footer__logo__img"
        />
      </Link>
      <ul className="footer__list">
        <li className="footer__item">
          <Link
            to="https://github.com/Q1W2E3R4T5Y6U7I8a"
            target="_blank"
            className="footer__item__link"
          >
            Github
          </Link>
        </li>
        <li className="footer__item">
          <Link
            to="https://github.com/Q1W2E3R4T5Y6U7I8a"
            target="_blank"
            className="footer__item__link"
          >
            Contacts
          </Link>
        </li>
        <li className="footer__item">
          <Link
            to="https://github.com/Q1W2E3R4T5Y6U7I8a"
            target="_blank"
            className="footer__item__link"
          >
            Rights
          </Link>
        </li>
      </ul>
      <div
        className={classNames('footer__actions', {
          'footer__actions--hidden': !isScrolled,
        })}
      >
        <button className="footer__button" onClick={handleScrollTop}>
          <span className="footer__button__text">Back to top</span>
          <img
            src="./img/icons/arrow-top.svg"
            alt="To top"
            className="footer__button__icon"
          />
        </button>
      </div>
    </footer>
  );
};
