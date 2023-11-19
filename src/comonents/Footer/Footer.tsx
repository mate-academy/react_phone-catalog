import { Link } from 'react-router-dom';

import './Footer.scss';

export const Footer = () => {
  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <footer className="footer">
      <Link
        to="/"
        title="Back to home page"
        className="icon icon--logo"
        onClick={handleButtonClick}
      />

      <div className="container footer__link-container">
        <a
          className="text text--small text--gray"
          href="https://github.com/Pa1eOrc/react_phone-catalog"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a href="/#" className="text text--small text--gray">
          Contacts
        </a>
        <a href="/#" className="text text--small text--gray">
          Rights
        </a>
      </div>

      <div className="footer__button-container">
        <p className="text text--small text--gray">Back to top</p>
        <button
          className="footer__button"
          type="button"
          title="Back to top"
          onClick={handleButtonClick}
        >
          <span className="icon icon--arrow" />
        </button>
      </div>
    </footer>
  );
};
