import { useThemeState } from '../../stateManagers/themeState';
import { NavigationCartFavorite } from '../NavigationCartFavorite';
import { NavigationMain } from '../NavigationMain';
import './Aside.scss';

export const Aside = () => {
  const { theme } = useThemeState();
  return (
    <aside className={`aside aside--${theme}`}>
      <nav className="aside__nav-bar">
        <NavigationMain isAside={true} />
        <NavigationCartFavorite isAside={true} />
      </nav>
    </aside>
  );
};
