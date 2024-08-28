import './Footer.scss';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__content-box">
      <a href="#" className="footer__logo" />
      <div className="footer__links-box">
        <a href="" className="footer__links">
          Github
        </a>
        <a href="" className="footer__links">
          Contacts
        </a>
        <a href="" className="footer__links">
          Rights
        </a>
      </div>
      <span
        className="footer__back-on-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
        <button className="navigation-button footer__button">
          <img
            className="footer__arrow"
            src="./img/arrow-top.svg"
            alt="slide top"
          />
        </button>
      </span>
    </div>
  </footer>
);
