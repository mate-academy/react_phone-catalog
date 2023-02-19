import { Logo } from './Logo';
import '../styles/footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content container">
        <Logo />
        <a
          href="https://github.com/oleksii-bieliaiev"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <button
          type="button"
          className="footer__button"
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
        >
          Back to top
          <i className="fas fa-angle-up" />
        </button>
      </div>
    </footer>
  );
};
