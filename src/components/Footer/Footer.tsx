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
          <div className="nav__footer menu__nav">
            <ul className="footer__list">
              <li className="footer__item">
                <a href="#github" className="footer__link">
                  GITHUB
                </a>
              </li>
              <li className="footer__item">
                <a href="#contacts" className="footer__link">
                  CONTACTS
                </a>
              </li>
              <li className="footer__item">
                <a href="#rights" className="footer__link">
                  RIGHTS
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__right">
          <a href="#" className="footer__right--link">Back to top</a>
          <a href="#" className="icon--slider">
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
