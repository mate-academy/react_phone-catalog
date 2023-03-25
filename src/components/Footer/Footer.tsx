import './footer.scss';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../logo/Logo.svg';

type Props = {
  pageUp: () => void;
};

export const Footer: React.FC<Props> = ({ pageUp }) => {
  const location = useLocation();

  useEffect(() => {
    pageUp();
  }, [location.pathname]);

  return (
    <footer className="Footer">
      <a href="/" className="Footer__link-logo">
        <img
          className="Footer__logo"
          src={logo}
          alt="Page logo"
        />
      </a>

      <ul className="Footer__contacts-list">
        <li className="Footer__item">
          <Link
            to="https://github.com/vitaliidox/react_phone-catalog"
            target="_blank"
            className="Footer__contact-item"
          >
            Github
          </Link>
        </li>

        <li className="Footer__item">
          <Link
            to="contacts"
            className="Footer__contact-item"
          >
            Contacts
          </Link>
        </li>

        <li className="Footer__item">
          <Link
            to="rights"
            className="Footer__contact-item"
          >
            Rights
          </Link>
        </li>
      </ul>

      <div className="Footer__go-up-items">
        <Link
          className="Footer__link-back-top"
          to="#start"
          onClick={pageUp}
        >
          Back to top
        </Link>

        <button
          type="button"
          aria-label="back-top"
          className="Footer__link-button-back-top"
          onClick={pageUp}
        />
      </div>
    </footer>
  );
};
