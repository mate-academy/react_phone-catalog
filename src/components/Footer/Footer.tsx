import './Footer.scss';
import { Logo } from '../Logo/Logo';
import { Arrow } from '../Buttons/Arrow/Arrow';
import { ArrowTypes } from '../../ArrowTypes';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <Logo />

          <ul className="footer__nav">
            <li className="footer__item">
              <a
                href="/"
                className="footer__link"
              >
                github
              </a>
            </li>

            <li className="footer__item">
              <a
                href="/"
                className="footer__link"
              >
                contacts
              </a>
            </li>

            <li className="footer__item">
              <a
                href="/"
                className="footer__link"
              >
                rights
              </a>
            </li>
          </ul>

          <div className="footer__backToTop">
            <p className="footer__paragraph">Back to top</p>

            <Arrow
              arrowType={ArrowTypes.up}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
