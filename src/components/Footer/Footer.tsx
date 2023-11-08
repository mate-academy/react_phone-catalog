import { Logo } from '../Logo';
import { Button } from '../Button';
import { ButtonType } from '../../types/ButtonType';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content container">
        <Logo />

        <ul className="footer__list">
          <li className="footer__item">
            <a
              href="https://github.com/Yeliseiev"
              className="footer__link"
              rel="noreferrer"
              target="_blank"
            >
              Github
            </a>
          </li>

          <li className="footer__item">
            <a
              href="https://github.com/Yeliseiev"
              className="footer__link"
              rel="noreferrer"
              target="_blank"
            >
              Contacts
            </a>
          </li>

          <li className="footer__item">
            <a
              href="https://github.com/Yeliseiev"
              className="footer__link"
              rel="noreferrer"
              target="_blank"
            >
              Rights
            </a>
          </li>
        </ul>

        <div className="footer__anchor">
          <span className="footer__anchor-text">Back to top</span>

          <Button
            content={ButtonType.ARROW}
            direction="up"
            onClick={() => window.scrollTo(0, 0)}
          />
        </div>
      </div>
    </footer>
  );
};
