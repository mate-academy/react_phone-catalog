import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Popup } from '../Popup';
import { CatalogContext } from '../Contexts/CatalogContext';

export const Footer: React.FC = () => {
  const { popup, setPopup } = useContext(CatalogContext);

  useEffect(() => {
    document.body.style.overflow = popup ? 'hidden' : 'auto';
  }, [popup]);

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
              src="/img/logo.png"
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
            <div className="footer__link" onClick={() => setPopup(true)}>
              Contacts
            </div>
            <div className="footer__link" onClick={() => setPopup(true)}>
              rights
            </div>
          </div>
          <div className="footer__back-to-top" onClick={backToTop}>
            <div className="footer__top-link">
              <p className="footer__top-text">Back to top</p>
              <button
                type="button"
                className="button button--up button--active"
              ></button>
            </div>
          </div>
        </div>
      </footer>
      {popup && (
        <Popup text={'This feature is not implemented yet.'} okButton={true} />
      )}
    </>
  );
};
