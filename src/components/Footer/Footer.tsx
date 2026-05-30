import './Footer.scss';
import logo from '../../images/logo/headerLogo.png';
import arrowUp from '../../images/logo/arrowUp.svg';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__logo">
            <a href="/" className="footer__logo_link">
              <img className="footer__logo_img" src={logo} alt="Logo" />
            </a>
          </div>

          <div className="footer__nav">
            <ul className="footer__nav_list">
              <li className="footer__nav_item">
                <a
                  href="https://github.com/emberlast1"
                  className="footer__nav_item_link"
                  target="blank"
                >
                  GITHUB
                </a>
              </li>
              <li className="footer__nav_item">CONTACTS</li>
              <li className="footer__nav_item">RIGHTS</li>
            </ul>
          </div>

          <div className="footer__button">
            <p className="footer__button_title">Back to top</p>
            <button
              className="footer__button_link"
              onClick={() => window.scrollTo({ top: 0 })}
            >
              <img src={arrowUp} alt="ArrowUp" className="footer__button_img" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
