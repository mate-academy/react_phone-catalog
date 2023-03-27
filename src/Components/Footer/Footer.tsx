import { Logo } from '../Logo/Logo';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <footer className="footer__content">
          <Logo />
          <ul className="footer__list">
            <li className="footer__item">
              <a
                href="https://github.com/ivanm2706"
                className="footer__link"
                target="_blank"
                rel="noreferrer"
              >
                github
              </a>
            </li>
            <li className="footer__item">
              <a href="tell:000000000" className="footer__link">
                contacts
              </a>
            </li>
            <li className="footer__item">
              <a href="#rights" className="footer__link">
                rights
              </a>
            </li>
          </ul>
          <div className="footer__toTop">
            <span className="footer__toTopTitle">Back to top</span>
            {/* eslint-disable-next-line */}
            <a href="#page" className="footer__LinkToTop" />
          </div>
        </footer>
      </div>
    </footer>
  );
};
