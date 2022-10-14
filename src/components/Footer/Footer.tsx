/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.scss';

export const Footer: React.FC = () => {
  const handleTopClick = () => {
    const header = document.querySelector('.header');

    header?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer__content">
          <div className="logo">
            <NavLink
              to="../"
              className="logo__title"
            />
          </div>

          <div className="footer__links">
            <div className="footer__link">Github</div>
            <div className="footer__link">Contacts</div>
            <div className="footer__link">Rights</div>
          </div>

          <div
            className="footer__back-top back-top"
            onClick={handleTopClick}
          >
            <p className="back-top__title">Back to top</p>
            <img
              src="img/icons/arrow-up.svg"
              alt="top arrow"
              className="back-top__image"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};
