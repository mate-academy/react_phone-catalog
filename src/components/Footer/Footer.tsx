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
            className="Footer__link"
            to="https://rialleons.github.io/react_phone-catalog/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>

          <Link
            className="Footer__link"
            to="/"
          >
            Contacts
          </Link>

          <Link
            className="Footer__link"
            to="/"
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
