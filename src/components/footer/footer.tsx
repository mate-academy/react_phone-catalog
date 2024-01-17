import { Link } from 'react-router-dom';
import './footer.scss';
// import logo from './LOGO.jpg';

export const Footer = (() => {
  return (
    <footer className="footer">
      <div className="footer__leftContainer">
        <Link to="/">
          <img src="./LOGO.jpg" alt="Logo" />
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

      <div className="footer__rightConteiner">
        Back to top
        <button type="button">
          <img src="./Chevron.jpg" alt="Logo" />
        </button>
      </div>
    </footer>
  );
});
