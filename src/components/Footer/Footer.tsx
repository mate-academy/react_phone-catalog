import { Link } from 'react-router-dom';
import './Footer.scss';
import { useTheme } from '../context/ThemeContext';

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__container--logo">
          <Link to="/" className="logo__link">
            <img
              src={
                theme === 'light'
                  ? './img/icons/Logo_footer.svg'
                  : './img/icons/Logo-footer_dark.svg'
              }
              alt="Logo icon"
              className="logo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </Link>
        </div>
        <div className="footer__container--contacts">
          <a
            href="https://github.com/tvoypervy/react_phone-catalog/tree/develop"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            href="https://github.com/tvoypervy/react_phone-catalog/tree/develop"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacts
          </a>
          <a
            href="https://github.com/tvoypervy/react_phone-catalog/tree/develop"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
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
                src={
                  theme === 'light'
                    ? './img/icons/Arrow-Up_icon.svg'
                    : './img/icons/Arrow-Up_dark.svg'
                }
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
