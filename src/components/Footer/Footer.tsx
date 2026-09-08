import './Footer.scss';
import FooterLogo from './../../img/footer-logo.png';
import TopArrow from './../../img/top-arrow.png';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__row">
          <div className="footer__col">
            <NavLink to="/" className="footer__logo">
              <img src={FooterLogo} alt="footer-logo" />
            </NavLink>
          </div>
          <div className="footer__col">
            <nav className="footer__navbar">
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="https://github.com/hetskoweb">Github</a>
                </li>
                <li className="footer__item">
                  <a href="https://github.com/hetskoweb">Contacts</a>
                </li>
                <li className="footer__item">
                  <a href="https://github.com/hetskoweb">Rights</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer__col">
            <div className="footer__totop" onClick={handleScrollToTop}>
              <div className="footer__totop-text">Back to top</div>
              <div className="footer__totop-arrow">
                <img src={TopArrow} alt="arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
