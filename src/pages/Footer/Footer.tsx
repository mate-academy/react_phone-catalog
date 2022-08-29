import { Link } from 'react-router-dom';
import { ChevronUp } from '../../SVG/ChevronUp/ChevronUp';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer__wrapper">
        <Link to="/" className="Footer__link">
          <img src="./assets/LOGO.svg" alt="logo" />
        </Link>
        <ul className="Footer__ul">
          <li className="Footer__list">
            <Link to="/" className="Footer__link">
              <h1 className="Footer__text">
                GITHUB
              </h1>
            </Link>
          </li>
          <li className="Footer__list">
            <Link to="/" className="Footer__link">
              <h1 className="Footer__text">
                CONTACTS
              </h1>
            </Link>
          </li>
          <li className="Footer__list">
            <Link to="/" className="Footer__link">
              <h1 className="Footer__text">
                RIGHTS
              </h1>
            </Link>
          </li>
        </ul>
        <button
          type="button"
          className="Footer__top"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
        >
          <h1 className="Footer__text SemiBold">
            Back to top
          </h1>
          <div className="Footer__btnTop">
            <ChevronUp />
          </div>
        </button>
      </div>
    </footer>
  );
};
