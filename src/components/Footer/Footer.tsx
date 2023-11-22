import './footer.scss';
import { Link } from 'react-router-dom';
import arrowUp from '../../Images/Icons/ArrowUp.svg';
import Logo from '../../Images/Icons/Logo.svg';

export const Footer = () => {
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__logo">
          <Link to="/">
            <img
              src={Logo}
              alt="logo"
            />
          </Link>
        </div>

        <div className="footer__nav">
          <a
            href="https://github.com/Mar4enkofff"
            className="footer__navlink link"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>

          <a
            href="https://github.com/Mar4enkofff"
            className="footer__navlink link"
            target="_blank"
            rel="noreferrer"
          >
            contacts
          </a>

          <a
            href="https://github.com/Mar4enkofff"
            className="footer__navlink link"
            target="_blank"
            rel="noreferrer"
          >
            rights
          </a>
        </div>

        <button
          type="button"
          className="footer__button"
          onClick={scrollUp}
        >
          Back to top
          <img
            src={arrowUp}
            alt="arrow up"
            className="footer__button-to-top"
          />
        </button>
      </div>
    </footer>
  );
};
