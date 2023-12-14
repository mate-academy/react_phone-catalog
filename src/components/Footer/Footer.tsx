import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Link to="/">
            <div className="header__logo" />
          </Link>
          <div className="footer__link">
            <Link
              className="footer__text"
              to="https://github.com/Tetiana-Hishchak"
            >
              <p className="footer__text">Github</p>
            </Link>
            <Link
              className="footer__text"
              to="https://github.com/Tetiana-Hishchak"
            >
              <p className="footer__text">Contacts</p>
            </Link>
            <Link
              to="https://github.com/Tetiana-Hishchak"
              className="footer__text"
            >
              <p className="footer__text">rights</p>
            </Link>
          </div>
          {isVisible ? (
            <div className="footer__top">
              <p className="footer__back">
                Back
                to top
              </p>
              <button
                type="button"
                aria-label="Mute volume"
                className="footer__button--top"
                onClick={scrollToTop}
              />
            </div>
          )
            : (<div className="container__button--fake" />)}
        </div>
      </div>
    </footer>
  );
};
