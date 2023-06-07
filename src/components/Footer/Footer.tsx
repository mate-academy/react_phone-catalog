import logo from '../../images/Logo.png';
import './Footer.scss';

export const Footer = () => {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo-link">
          <a className="footer__link" href="/">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="footer__links">
          <a
            className="footer__link"
            href="https://github.com/mate-academy"
          >
            Github
          </a>
          <a className="footer__link" href="/">Contacts</a>
          <a className="footer__link" href="/">Rights</a>
        </div>
        <div className="footer__back-to-top">
          <a
            className="footer__link_back-to-top"
            href="/"
            onClick={(event) => {
              event.preventDefault();
              scrollToTop();
            }}
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};
