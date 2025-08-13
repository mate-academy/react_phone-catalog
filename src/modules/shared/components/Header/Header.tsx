import { Menu } from '../Menu/Menu';
import scss from './Header.module.scss';

export const Header = () => {
  return (
    <header className={scss.header}>
      <div className={scss.header__container}>
        <a href="/" aria-label="Link to main page">
          <svg className={scss.logoIcon}>
            <use href="/icons/icons.svg#logo-icon"></use>
          </svg>
        </a>
        <button aria-label="Open and close menu">
          <svg className={scss.burgerIcon}>
            <use href="/icons/icons.svg#burger-icon"></use>
          </svg>
        </button>
      </div>

      <Menu />
    </header>
  );
};
