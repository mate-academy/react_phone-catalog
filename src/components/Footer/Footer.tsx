import { footerLinks } from '../../services/footerLinks';
import { IconType } from '../../types/IconTypes';
import { scrollToTop } from '../../utils/scrollToTOp';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import './Footer.scss';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__content">
      <Logo />

      <nav className="footer__nav">
        <ul className="footer__list">
          {footerLinks.map(({ text, link }) => (
            <li className="footer__item">
              <a
                href={link}
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="footer__button"
        type="button"
        onClick={scrollToTop}
      >
        Back to top
        <div className="footer__icon">
          <Icon iconType={IconType.arrowUp} />
        </div>
      </button>
    </div>
  </footer>
);
