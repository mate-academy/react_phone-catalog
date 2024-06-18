import { Logo } from '../Logo';
import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__content container">
        <Logo placement={'footer'} />

        <ul className="footer__link-list">
          <li className="footer__link-item">
            <a href="https://github.com/io-med" className="footer__link">
              Github
            </a>
          </li>
        </ul>

        <button className="footer__to-top-button" onClick={scrollToTop}>
          Back to top
        </button>
      </div>
    </footer>
  );
};
