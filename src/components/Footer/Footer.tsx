import { Link } from 'react-router-dom';
import './Footer.scss';
import { scrollOnTop } from '../../utils';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <Link to="/" className="logo-link">
          <img
            src="./img/logo/logo-nice-gadgets.svg"
            alt="logo"
            onClick={() => scrollOnTop()}
          />
        </Link>

        <div className="contacts">
          <Link
            to="https://github.com/ogerenko"
            className="contacts__link"
            target="_blank"
          >
            Github
          </Link>
          <Link to={`/contacts`} className="contacts__link">
            Contacts
          </Link>
          <Link
            to="https://github.com/ogerenko"
            className="contacts__link"
            target="_blank"
          >
            Portfolio
          </Link>
        </div>

        <div className="on-top" onClick={() => scrollOnTop()}>
          <div className="on-top__text">Back to top</div>
          <span className="on-top__icon" />
        </div>
      </div>
    </footer>
  );
};
