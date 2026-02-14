import './footer.scss';
import logo from '../../images/header/logo-nice-gadgets.png';
import sliderTop from '../../images/homepage/slider-top.png';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="line"></div>
      <div className="container">
        <div className="footer">
          <div className="footer__logo">
            <img src={logo} alt="logo" className="footer__logo--logo" />
          </div>
          <div className="footer__info">
            <Link
              className="footer__info--text"
              to="https://github.com/renatoveludo/react_phone-catalog"
            >
              GITHUB
            </Link>
            <a className="footer__info--text" href="#">
              CONTACTS
            </a>
            <a className="footer__info--text" href="#">
              RIGHTS
            </a>
          </div>
          <div className="footer__end">
            <p className="footer__end--text">Back to top</p>
            <button className="footer__end--sliderTop" onClick={scrollToTop}>
              <img src={sliderTop} alt="sliderTop" className="sliderTop" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
