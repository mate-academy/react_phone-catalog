import { footerLinks } from '../../constants/common';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer page__footer">
      <div className="footer__content">
        <div className="footer__logo">
          <a href="#" className="">
            <img src="./img/Logo2.svg" alt="logo" />
          </a>
        </div>

        <nav className="footer__nav nav">
          <ul className="nav__list nav__list--footer">
            {footerLinks.map((link, index) => (
              <li className="nav__item" key={index}>
                <a href={link.page} target="blank" className="nav__link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer__btn">
          <div className="back-to-top-container">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="back-to-top-text"
            >
              Back to top
            </button>
            <button
              className="back-to-top-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img src="./img/icons/btn-back-to-top.svg" alt="Back to top" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
