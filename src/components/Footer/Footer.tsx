import { LogoIcon } from '../../assets/icons/LogoIcon';
import { ButtonType } from '../../helpers/types/ButtonType';
import { Button } from '../Button/Button';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content container">
        <LogoIcon />

        <ul className="footer__list">
          <li className="footer__item">
            <a
              href="https://github.com/Orchibald"
              className="footer__link"
              rel="noreferrer"
              target="_blank"
            >
              Github
            </a>
          </li>

          <li className="footer__item">
            <a
              href="https://github.com/Orchibald"
              className="footer__link"
              rel="noreferrer"
              target="_blank"
            >
              Contacts
            </a>
          </li>

          <li className="footer__item">
            <a
              href="https://github.com/Orchibald"
              className="footer__link"
              rel="noreferrer"
              target="_blank"
            >
              Rights
            </a>
          </li>
        </ul>

        <div className="footer__anchor">
          <Button
            content={ButtonType.ARROW}
            direction="up"
            onClick={() => window.scrollTo(0, 0)}
          />

          <span className="footer__anchor-text">Back to top</span>
        </div>
      </div>
    </footer>
  );
};
