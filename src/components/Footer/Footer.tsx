import React from 'react';

export const Footer = () => {
  return (
    <section className="footer">
      <img src="./img/logo.svg" alt="logo" />
      <div className="footer__links">
        <a href="#" className="footer__link">Github</a>
        <a href="#" className="footer__link">Contacts</a>
        <a href="#" className="footer__link">Rights</a>
      </div>
      <div className="footer__top-button-container">
        <p className="footer__paragraph">Back to top</p>
        <a href="#top" className="footer__top-button"/>
      </div>
    </section>
  );
}
