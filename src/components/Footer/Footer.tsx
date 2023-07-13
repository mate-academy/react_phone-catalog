import { Logo } from '../Logo/Logo';
import './footer.scss';
import { ArrowButton } from '../Buttons/arrowButton/arrowButton';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__content">
          <Logo />

          <ul className="footer__menu">
            <li className="footer__item">
              <a
                href="https://github.com/vasyliev-anton"
                className="footer__link"
                target="__blank"
              >
                GitHub
              </a>
            </li>
            <li className="footer__item">
              <a href="#/" className="footer__link">contacts</a>
            </li>
            <li className="footer__item">
              <a href="#/" className="footer__link">rights</a>
            </li>
          </ul>

          <div className="footer__button">
            <span className="footer__button-text">Back to top</span>
            <a
              href="#headerNavBar"
              className="footer__button-arrow"
            >
              <ArrowButton direction="up" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
