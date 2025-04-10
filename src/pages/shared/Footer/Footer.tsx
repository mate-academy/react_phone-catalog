import './Footer.scss';
import { FC, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { icons } from '../../../constants/iconsObject';
import { GlobalContext } from '../../../context/GlobalContext';

export const Footer: FC = () => {
  const { theme } = useContext(GlobalContext);

  const backToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="footer">
      <div className="footer__container">
        <a href="#" className="footer__logo-container">
          <img
            src={theme === 'light' ? 'logo.svg' : 'logo_dark.svg'}
            alt="Nice Gadgets"
            className="footer__logo"
          />
        </a>

        <div className="footer__items">
          <Link
            to="https://github.com/nataliaso23"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
          <Link
            to="/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacts
          </Link>
          <Link to="/" className="footer__link">
            rights
          </Link>
        </div>

        <div className="footer__block" onClick={backToTop}>
          <span className="footer__button-title">Back to top</span>
          <button className="footer__button">
            <Icon icon={icons.arrow_left[theme]} />
          </button>
        </div>
      </div>
    </div>
  );
};
