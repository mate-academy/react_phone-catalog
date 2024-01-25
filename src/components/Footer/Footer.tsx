import { Link } from 'react-router-dom';
import './Footer.scss';
import { handleToTopScroll } from '../../helpers/functions/handleToTopScroll';

export const Footer = () => {
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
            to="/"
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

          <div
            className="Footer__to-top-scroll"
          >
            Back to top
            <button
              type="button"
              className="Footer__to-top"
              onClick={handleToTopScroll}
            >
              <img
                src="/img/icons/vector_icon.svg"
                alt="Icon vector"
                className="Footer__vector-icon"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
