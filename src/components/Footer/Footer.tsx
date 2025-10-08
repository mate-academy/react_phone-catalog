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
          <li className="footer__nav--info">Github</li>
          <li className="footer__nav--info">Contacts</li>
          <li className="footer__nav--info">Rights</li>
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
