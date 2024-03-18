import arrowUp from '../../img/arrow_up.svg';
import './footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <a href="/" className="footer__logo">
          Logo
        </a>

        <nav className="footer__nav">
          <a
            href="https://github.com/Daniil-Lilin"
            className="footer__nav-link"
            target="blank"
          >
            GitHub
          </a>
          <a
            href="https://github.com/Daniil-Lilin"
            className="footer__nav-link"
            target="blank"
          >
            Contacts
          </a>
          <a
            href="https://github.com/Daniil-Lilin"
            className="footer__nav-link"
            target="blank"
          >
            Rights
          </a>
        </nav>

        <button
          type="button"
          className="footer__button btn-arrows"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img className="footer__icon" src={arrowUp} alt="arrow" />
        </button>
      </div>
    </footer>
  );
};
