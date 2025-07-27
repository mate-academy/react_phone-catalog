import './Header.scss';
import { LogoShop } from '../../ui/LogoShop';
import { NavigationMain } from '../NavigationMain';
import { NavigationCartFavorite } from '../NavigationCartFavorite';
import cn from 'classnames';
import { useAsideState } from '../../stateManagers/asideState';
import { Dropdown } from '../../ui/Dropdown';
import { ButtonTheme } from '../../ui/ButtonTheme';
import { useNavigate } from 'react-router-dom';
import type { Language } from '../../types/language';
import { useTranslationState } from '../../stateManagers/languageState';
import { useThemeState } from '../../stateManagers/themeState';

export const Header = () => {
  const { isAsideOpen, toggleAside } = useAsideState();
  const { setLanguage, language } = useTranslationState();
  const navigate = useNavigate();
  const { theme } = useThemeState();

  const handleChange = (value: string) => {
    if (value === 'RU') {
      navigate('/russians-are-not-people');
      return;
    }

    setLanguage(value as Language);
  };

  return (
    <header className={`header header--${theme}`}>
      <LogoShop />

      <nav className="header__nav-bar">
        <NavigationMain />
        <NavigationCartFavorite />
      </nav>

      <div className="header__right-controls">
        <div className="user-comfort">
          <ButtonTheme />
          <Dropdown
            value={language}
            onChange={handleChange}
            variants={['UA', 'EN', 'RU']}
            cl="language"
            chewron={false}
          />
        </div>

        <button
          className={cn(isAsideOpen ? 'menu-open' : 'menu-close')}
          onClick={toggleAside}
        ></button>
      </div>
    </header>
  );
};
