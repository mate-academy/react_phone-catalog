import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import { CircleButton } from '../../shared/components/Buttons/CircleButton';
import {
  logoLightMode,
  logoDarkMode,
  icons,
} from '../../../global-assets/static';
import { UISettingsState } from '../../shared/reducer/LangThemeReducer';
import { TranslationContext } from '../../../i18next/shared/TranslationContext';

export const Footer: React.FC = React.memo(() => {
  const footerNavItems = useContext(TranslationContext).footerNavItems;
  const btnFooterBack = useContext(TranslationContext).btnsTitle.footerBack;

  const settingsState = useContext(UISettingsState);
  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          {settingsState.theme === 'light' ? (
            <img
              className="footer__logo"
              src={logoLightMode}
              alt="Compamy logo"
            />
          ) : (
            <img
              className="footer__logo"
              src={logoDarkMode}
              alt="Compamy logo"
            />
          )}
        </div>
        <nav className="footer__nav">
          <ul className="footer__list">
            {footerNavItems.map(navItem => (
              <Link className="footer__link" to={'/'} key={navItem}>
                <li>{navItem.toUpperCase()}</li>
              </Link>
            ))}
          </ul>
        </nav>

        <button className="footer__btn" onClick={moveToTop}>
          <CircleButton icon={icons.arrowUp.valuePath} />
          {btnFooterBack}
        </button>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
