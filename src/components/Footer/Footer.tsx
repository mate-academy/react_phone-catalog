import './Footer.scss';
import Logo from '../../../public/img/Logo/Logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__left">
          <a href="#" className="logo">
            <img src={Logo} alt="Logo" />
          </a>
        </div>
        <div className="footer__center">
          <div className="nav menu__nav">
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#github" className="nav__link">
                  GITHUB
                </a>
              </li>
              <li className="nav__item">
                <a href="#contacts" className="nav__link">
                  CONTACTS
                </a>
              </li>
              <li className="nav__item">
                <a href="#rights" className="nav__link">
                  RIGHTS
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__right"></div>
      </div>
    </footer>
  );
};

export default Footer;
