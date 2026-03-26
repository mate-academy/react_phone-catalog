import './Footer.scss';
import Logo from '../../../public/img/Logo/Logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {' '}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__left">
            <Link to="/" className="logo">
              <img src={Logo} alt="Logo" />
            </Link>
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
            <a className="footer__right--link">Back to top</a>
            <button onClick={goTop} className="icon--slider"></button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
