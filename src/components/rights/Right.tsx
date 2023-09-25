import { Link } from 'react-router-dom';
import './style.scss';

export const Rigth = () => {
  return (
    <div className="right">
      <h1 className="right__name">Oleksandr Zaporozhets</h1>

      <div className="right__line" />

      <div className="right__contacts">
        <h2 className="right__contacts-title">Contacts</h2>
        <div className="right__contacts-phone">
          <img
            className="right__contacts-image"
            src="./img/icons/phone.svg"
            alt="phone"
          />
          <a
            className="right__contacts-phone-link"
            href="tel:+38 093 116 27 88"
          >
            Phone
          </a>
        </div>
        <div className="right__contacts-phone">
          <img
            className="right__contacts-image"
            src="./img/icons/telegram.svg"
            alt="phone"
          />
          <Link
            className="right__contacts-phone-link"
            to="tg://resolve?domain=<zipic>"
          >
            Telegram
          </Link>
        </div>
        <div className="right__contacts-phone">
          <img
            className="right__contacts-image"
            src="./img/icons/linkedin.svg"
            alt="phone"
          />
          <Link
            className="right__contacts-phone-link"
            to="https://www.linkedin.com/in/oleksandr-zaporozhets-2a4695267"
          >
            LinkedIn
          </Link>
        </div>
        <div className="right__contacts-phone">
          <img
            className="right__contacts-image"
            src="./img/icons/github.svg"
            alt="phone"
          />
          <Link
            className="right__contacts-phone-link"
            to="https:/github.com/zipic"
          >
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rigth;
