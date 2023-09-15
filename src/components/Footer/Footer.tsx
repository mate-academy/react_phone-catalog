import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { NavContacts } from './NavContacts';
import './Footer.scss';

export const Footer: FC = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <footer className="footer">
      <Link to="/" className="footer__logo-link" onClick={handleClick}>
        <img
          src="./img/img/Logo.svg"
          alt="MAIN_LOGO"
          className="footer__logo"
        />
      </Link>

      <NavContacts onClick={handleClick} />

      <div
        className="footer__back-to-top back-to-top"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <p className="back-to-top__title">Back to top</p>

        <div className="back-to-top__button" />
      </div>
    </footer>
  );
};
