import { Link } from 'react-router-dom';
import arrowTop from '../../img/icons/arrowTop.svg';
import logo from '../../img/icons/logo.svg';

export const Footer = () => {
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="footer">
      <footer className="footer__container">
        <Link className="footer__logo" to={'/'}>
          <img src={logo} alt="logo" />
        </Link>
        <div className="footer__links">
          <Link className="footer__link" to={'/'}>
            GitHUB
          </Link>
          <Link className="footer__link" to={'/'}>
            Contacts
          </Link>
          <Link className="footer__link" to={'/'}>
            Rights
          </Link>
        </div>
        <button className="footer__up">
          <p onClick={goTop} className="footer__button-text">
            Back to top
          </p>
          <button onClick={goTop} className="button-right-left button-size">
            <img src={arrowTop} alt="" />
          </button>
        </button>
      </footer>
    </div>
  );
};
