import { Link } from 'react-router-dom';
import './Footer.scss';
// import logo from './LOGO.jpg';

export const Footer = (() => {
  return (
    <footer className="footer">
      <div className="footer__leftContainer">
        <Link to="/">
          <img src="/img/logo.svg" alt="Logo" />
        </Link>
      </div>

      <div className="footer__center">
        <ul>
          <li className="footer__center-item">
            <Link to="/GITHUB">Github</Link>
          </li>
          <li className="footer__center-item">
            <Link to="/Contacts">Contacts</Link>
          </li>
          <li className="footer__center-item">
            <Link to="/Rights">Rights</Link>
          </li>
        </ul>
      </div>

      <div className="footer__rightContainer">
        Back to top

        <button
          type="button"
          className="ArrowUp"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="img/ArrowUp.png" alt="Logo" className="ArrowUp__link" />
        </button>
      </div>
    </footer>
  );
});
