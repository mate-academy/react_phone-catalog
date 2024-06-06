import { Link } from 'react-router-dom';
import { Logo, ArrowTop } from '../../icons';
import './Footer.scss';

export const Footer = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer">
      <div className="footer__wrapper">
        <Link to="/">
          <Logo />
        </Link>

        <ul className="footer__contacts">
          <li>
            <Link
              target="_blank"
              to="https://github.com/FallenMAD"
              className="footer__contact"
            >
              github
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="/"
              className="footer__contact"
            >
              contacts
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to="/"
              className="footer__contact"
            >
              rights
            </Link>
          </li>
        </ul>

        <div className="footer__backToTop">
          <p className="footer__title">Back to top</p>
          <button
            type="button"
            className="footer__button"
            onClick={handleClick}
          >
            <ArrowTop />
          </button>
        </div>
      </div>
    </div>
  );
};
