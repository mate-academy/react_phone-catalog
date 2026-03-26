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
                  <Link to="" className="footer__link">
                    GITHUB
                  </Link>
                </li>
                <li className="footer__item">
                  <Link to="" className="footer__link">
                    CONTACTS
                  </Link>
                </li>
                <li className="footer__item">
                  <Link to="" className="footer__link">
                    RIGHTS
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer__right">
            <Link to="" className="footer__right--link">
              Back to top
            </Link>
            <button onClick={goTop} className="icon--slider"></button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
