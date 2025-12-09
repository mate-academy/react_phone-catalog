import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__container--logo">
          <Link to="/" className="logo__link">
            <img
              src="/img/icons/Logo_footer.svg"
              alt="Logo icon"
              className="logo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </Link>
        </div>
        <div className="footer__container--contacts">
          <a href="/" className="link">
            Github
          </a>
          <a href="/" className="link">
            Contacts
          </a>
          <a href="/" className="link">
            Rights
          </a>
        </div>
        <div className="footer__container--backToTop">
          <div className="backToTop">
            <p
              className="backToTop__name"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to top
            </p>
            <button
              className="backToTop__button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/img/icons/Arrow-Up_icon.svg"
                alt="Back to top icon"
                className="icon"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
