import logo from '../../assets/logo.svg';
import arrowUp from '../../assets/arrow_up.svg';
import './Footer.scss';

export const Footer = () => (
  <footer className="footer">
    <img src={logo} alt="Site logo" />

    <ul className="footer__list">
      <li className="footer__item">
        <a
          title="Github"
          target="_blank"
          href="https://github.com/Zibi95/react_phone-catalog"
          className="footer__link"
          rel="noreferrer"
        >
          Github
        </a>
      </li>

      <li className="footer__item">
        <a href="#/" className="footer__link">Contacts</a>
      </li>

      <li className="footer__item">
        <a href="#/" className="footer__link">Rights</a>
      </li>
    </ul>

    <a className="footer__button" href="#nav">
      Back to top
      <img
        className="footer__icon"
        src={arrowUp}
        alt="Button that will take you to the top of the page"
      />
    </a>
  </footer>
);
