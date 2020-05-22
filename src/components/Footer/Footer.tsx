import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const onScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="footer">
      <img src="./img/logo.svg" alt="logo" />
      <div className="footer__links">
        <Link to="/" className="footer__link">Github</Link>
        <Link to="/" className="footer__link">Contacts</Link>
        <Link to="/" className="footer__link">Rights</Link>
      </div>
      <div className="footer__top-button-container">
        <p className="footer__paragraph">Back to top</p>
        <button
          type="button"
          className="footer__top-button"
          onClick={onScroll}
        />
      </div>
    </section>
  );
};
