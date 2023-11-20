import logo from '../images/Logo.svg';
import top from '../images/top.svg';

export const Footer = () => {
  return (
    <footer className="footer">
      <a href="/" className="logo">
        <img src={logo} alt="" />
      </a>

      <div className="footer__nav">
        <a href="https//github.com" className="footer__nav--link">
          GITHUB
        </a>
        <a href="/" className="footer__nav--link">
          CONTACTS
        </a>
        <a href="/" className="footer__nav--link">
          RIGHTS
        </a>
      </div>

      <a href="/" className="footer__button">
        BACK TO TOP
        <img src={top} alt="back to top" />
      </a>
    </footer>
  );
};
