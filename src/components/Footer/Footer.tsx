import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <img
            className="footer__logo--img"
            src="../images/logo.svg"
            alt="footer logo"
          />
        </div>
        <ul className="footer__links">
          <li className="footer__link">
            <a href="https://github.com/ptbit" target="_blank" rel="noreferrer">
              github
            </a>
          </li>
          <li className="footer__link">contacts</li>
          <li className="footer__link">rights</li>
        </ul>

        <div className="footer__back-to-top">
          <label
            htmlFor="back-to-top-btn"
            className="footer__back-to-top-label"
          >
            Back to top
          </label>
          <button
            id="back-to-top-btn"
            className="footer__back-to-top-button"
            type="button"
            aria-label="back-to-top"
            onClick={() => {
              window.scrollTo({
                top: 0,
              });
            }}
          >
            <i className="ico ico-up" />
          </button>
        </div>
      </div>
    </footer>
  );
};
