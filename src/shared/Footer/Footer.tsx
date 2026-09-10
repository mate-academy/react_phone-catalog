import './Footer.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  function srcollToUp() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className="footer">
      <div className="footer__content">
        <Link
          to={'/'}
          className="footer__content-left"
          onClick={() => srcollToUp}
        >
          <div className="footer__logo"></div>
        </Link>
        <div className="footer__content-center">
          <a
            href="https://github.com/artembaranovsky1"
            target="_blank"
            className="footer__link"
            rel="noreferrer"
          >
            Github
          </a>
          <p className="footer__link">Contacts</p>
          <p className="footer__link">rights</p>
        </div>
        <div className="footer__content-right">
          <p className="footer__link--up" onClick={() => srcollToUp()}>
            Back to top
          </p>
          <div className="footer__button" onClick={() => srcollToUp()}>
            <div className="footer__button--up"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
