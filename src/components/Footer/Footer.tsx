import { FC } from 'react';

import './Footer.scss';

export const Footer: FC = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleBackToTop();
    }
  };

  return (
    <footer className="footer">
      <img
        src="img/LOGO.svg"
        alt="Logo"
        className="footer__logo"
      />

      <div className="footer__container">
        <a
          href="https://github.com/deandre25/react_phone-catalog"
          className="footer__container-item"
        >
          GitHub
        </a>

        <a
          href="/"
          className="footer__container-item"
        >
          Contacts
        </a>

        <a
          href="/"
          className="footer__container-item"
        >
          Rights
        </a>
      </div>

      <div
        className="footer-back"
        onClick={handleBackToTop}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <p className="footer-back__title">Back to top</p>

        <div className="footer-back__button" />
      </div>
    </footer>
  );
};
