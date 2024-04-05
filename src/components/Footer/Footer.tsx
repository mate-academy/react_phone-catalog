import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const backToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <footer className="footer">
        <div className="footer__container">
          <Link to="" className="footer__logo-link">
            <img
              className="footer__logo"
              src="img/Logo.png"
              alt="Bakerlab logo"
            />
          </Link>
          <div className="footer__contacts">
            <a
              href="https://www.github.com"
              className="footer__link"
              target="_blanck"
            >
              Github
            </a>
            <Link to="contacts" className="footer__link">
              Contacts
            </Link>
            <Link to="rights" className="footer__link">
              rights
            </Link>
          </div>
          {showBackToTop ? (
            <div className="footer__back-to-top" onClick={backToTop}>
              <div className="footer__top-link">
                <p className="footer__top-text">Back to top</p>
                <button
                  type="button"
                  className="button button--up button--active"
                ></button>
              </div>
            </div>
          ) : (
            <div className="footer__back-to-top footer__back-to-top--hidden">
              <div className="footer__top-link">
                <p className="footer__top-text">Back to top</p>
                <button
                  type="button"
                  className="button button--up button--active"
                ></button>
              </div>
            </div>
          )}
        </div>
      </footer>
    </>
  );
};
