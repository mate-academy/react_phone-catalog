import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Popup } from '../Popup';
import { CatalogContext } from '../Contexts/CatalogContext';

export const Footer: React.FC = () => {
  const { popup, setPopup } = useContext(CatalogContext);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    document.body.style.overflow = popup ? 'hidden' : 'auto';
  }, [popup]);

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
            <div className="footer__link" onClick={() => setPopup('Contacts')}>
              Contacts
            </div>
            <div className="footer__link" onClick={() => setPopup('rights')}>
              rights
            </div>
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
      {!!popup.length && <Popup property={popup} />}
    </>
  );
};
