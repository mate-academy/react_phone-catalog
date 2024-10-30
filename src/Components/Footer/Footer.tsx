import '../icons/icon.scss';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="logo__footer" />
      <nav className="footer__navigation">
        <a href="" className="footer__link">
          GITHUB
        </a>
        <a href="" className="footer__link">
          CONTACTS
        </a>
        <a href="" className="footer__link">
          RIGHTS
        </a>
      </nav>
      <div className="footer__back-to-top">
        <div className="footer__text">Back to top</div>

        <a href="#backtotop" className="footer__link-arrow">
          <div className="footer__arrow"></div>
        </a>
      </div>
    </footer>
  );
};
