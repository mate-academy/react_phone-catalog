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

  const linkedInUrl =
    'https://www.linkedin.com/in/yaroslav-tabachuk-0391232b3/';

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
                  <Link
                    to="https://github.com/Yar14k/react_phone-catalog"
                    className="footer__link"
                  >
                    GITHUB
                  </Link>
                </li>
                <li className="footer__item">
                  <Link to={linkedInUrl} className="footer__link">
                    CONTACTS
                  </Link>
                </li>
                <li className="footer__item">
                  <Link to="/terms" className="footer__link">
                    RIGHTS
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer__right" onClick={goTop}>
            <span className="footer__right--text">Back to top</span>
            <button className="icon--slider"></button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
