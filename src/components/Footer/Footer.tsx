import logo from '../../images/icons/logo.svg';
import arrowUp from '../../images/icons/arrow-up.svg';

import './Footer.scss';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer__content container">
        <a href="#">
          <img alt="logo" src={logo} className="footer__logo" />
        </a>

        <ul className="footer__nav">
          <li className="footer__nav--info">
            <a
              href="https://github.com/julius0724"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__nav--link"
            >
              Github
            </a>
          </li>
          <li className="footer__nav--info">
            <a
              href="mailto:yuliizilnyk@gmail.com"
              className="footer__nav--link"
            >
              Contacts
            </a>
          </li>
          <li className="footer__nav--info">
            <a href="#" className="footer__nav--link">
              Rights
            </a>
          </li>
        </ul>

        <div className="footer__back">
          <div className="footer__back-to-top">Back to top</div>
          <button
            className="footer__button"
            onClick={handleScrollToTop}
            aria-label="Scroll to top"
          >
            <img src={arrowUp} alt="Back to top" />
          </button>
        </div>
      </div>
    </footer>
  );
};
