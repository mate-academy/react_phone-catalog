import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo/Logo';

export const Footer = () => {
  const backToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <footer className="footer">
      <div className="container footer__container">
        <Logo />
        <div className="footer__links">
          <Link to="/" className="footer__link">Github</Link>
          <Link to="/" className="footer__link">Contacts</Link>
          <Link to="/" className="footer__link">Rights</Link>
        </div>
        <div className="footer__top-button-container">
          <p className="footer__paragraph">Back to top</p>
          <button
            type="button"
            aria-label="BackToTop"
            className="footer__top-button"
            onClick={backToTop}
          />
        </div>
      </div>
    </footer>
  );
};
