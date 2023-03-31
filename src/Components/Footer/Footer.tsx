import { Logo } from '../Logo/Logo';

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
              <a href="tel:+000000000" className="footer__link">
                contacts
              </a>
            </li>
            <li className="footer__item">
              <a href="/" className="footer__link">
                rights
              </a>
            </li>
          </ul>
          <div className="footer__toTop">
            <span className="footer__toTopTitle">Back to top</span>
            {/* eslint-disable-next-line */}
            <button
              type="button"
              className="icon icon--up footer__buttonToTop"
              onClick={() => window.scrollTo(0, 0)}
            />
          </div>
        </footer>
      </div>
    </footer>
  );
};
