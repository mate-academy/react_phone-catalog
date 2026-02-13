import logo from '../img/Logo.png';
import { Link } from 'react-router-dom';
import './Footer.scss';
import vectorTop from '../img/vectorToTop.svg';

export const Footer = () => {
  return (
    <footer>
      <div className="grid-container">
        <div className="wraper">
          <Link to={'/'} className="logo">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
          <a href="https://github.com/AmateZz">Github</a>
          <a href="https://github.com/AmateZz">Contacts</a>
          <a href="https://github.com/AmateZz">Rights</a>
          <div className="back-to-top">
            Back to top
            <button className="back-to-top__button">
              <a href="#">
                <img className="vectorTop" src={vectorTop} alt="vectorToTop" />
              </a>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
