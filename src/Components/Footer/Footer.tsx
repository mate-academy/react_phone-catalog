import { Link } from 'react-router-dom';
import './Footer.scss';
import { useEffect, useState } from 'react';

export const Footer = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrollable =
        document.documentElement.scrollHeight > window.innerHeight;
      const scrollTop = window.pageYOffset;

      setShowButton(isScrollable && scrollTop > 100);
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
    <div className="footer">
      <div className="footer__line" />

      <div className="footer__container">
        <Link to="/" className="logo footer__logo" aria-label="logo">
          <div className="logo-arm footer__logo-arm" />
        </Link>

        <div className="footer__contant-block">
          <Link className="footer__link" to="https://github.com/denedweb">
            Github
          </Link>

          <Link className="footer__link" to="/">
            Contacts
          </Link>

          <Link className="footer__link" to="/">
            Rights
          </Link>
        </div>

        {showButton ? (
          <div className="footer__button-top">
            <p className="footer__button-top-text">Back to top</p>

            <button
              onClick={scrollToTop}
              aria-label="button top"
              className="footer__button-top-link"
              type="button"
            />
          </div>
        ) : (
          <div className="footer__button-top" />
        )}
      </div>
    </div>
  );
};
