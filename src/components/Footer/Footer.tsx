import { Link } from 'react-router-dom';
import './Footer.scss';
import themeStyles from '../../styles/utils/themeStyles';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { scrollToTop } from '../ScrollToTop';

export const Footer = () => {
  const currentTheme = useSelector(
    (state: RootState) => state.currentTheme.theme,
  );

  const { logo, arrow } = themeStyles(currentTheme === 'light-theme');

  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <Link to="/" className="footer__logo-link">
            <img src={logo} alt="logo" className="footer__logo-img" />
          </Link>
        </div>

        <ul className="footer__info">
          <li className="uppercase">
            <Link
              to="https://github.com/HryniukTaras"
              target="_blank"
              className="footer__link"
            >
              github
            </Link>
          </li>
          <li className="uppercase">
            <Link
              to="https://github.com/HryniukTaras"
              target="_blank"
              className="footer__link"
            >
              contacts
            </Link>
          </li>
          <li className="uppercase">
            <Link
              to="https://github.com/HryniukTaras"
              target="_blank"
              className="footer__link"
            >
              rights
            </Link>
          </li>
        </ul>

        <div className="footer__to-top">
          <span className="small-text">Back to top</span>
          <button className="arrow-button" onClick={() => scrollToTop()}>
            <img
              src={arrow}
              alt="Back to top button"
              className="icon icon-top"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
