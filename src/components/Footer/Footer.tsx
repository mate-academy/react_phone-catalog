/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';

import './Footer.scss';

export const Footer = () => {
  const handleToTopScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="Footer">
      <div className="Footer__content">
        <Link
          to="/"
          className="Footer__logo"
          onClick={handleToTopScroll}
        />

        <div className="Footer__links">
          <Link
            to="https://github.com/rialleons/react_phone-catalog/"
            className="Footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>

          <Link
            to="/"
            className="Footer__link"
          >
            Contacts
          </Link>

          <Link
            to="/"
            className="Footer__link"
          >
            Rights
          </Link>
        </div>

        <div className="Footer__to-top">
          <p className="Footer__to-top-text">Back to top</p>

          <button
            type="button"
            className="Footer__to-top-link"
            onClick={handleToTopScroll}
          />
        </div>
      </div>
    </footer>
  );
};
