import { Link } from 'react-router-dom';
import './Footer.scss';
import { Logo } from '../Logo/Logo';
import { translate } from '../../utils/translate';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';

export const Footer = () => {
  const { lang } = useContext(LangContext);

  return (
    <div className="footer">
      <Logo />
      <nav className="footer__nav">
        <ul className="footer__nav__list">
          <li className="list__item">
            <Link to="#" className="nav__link">
              Github
            </Link>
          </li>
          <li className="list__item">
            <Link to="#" className="nav__link">
              {translate('footer.link.contacts', lang)}
            </Link>
          </li>
          <li className="list__item">
            <Link to="#" className="nav__link">
              {translate('footer.link.rights', lang)}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="footer__back-top">
        <p className="small-text">{translate('footer.button', lang)}</p>
        <div
          className="icon button button--back-top icon--back-top"
          onClick={() => window.scrollTo(0, 0)}
        ></div>
      </div>
    </div>
  );
};
