import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer__content">
        <Logo />

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

        <Link
          className="Footer__link Footer__link--semibold"
          to="/"
        >
          Back to top
          <button type="button" className="Footer__to-top">
            <img
              src="/img/icons/vector_icon.svg"
              alt="Icon vector"
              className="Footer__vector-icon"
            />
          </button>
        </Link>
      </div>
    </footer>
  );
};
