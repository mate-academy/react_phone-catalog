import { Menu } from '../Menu/Menu';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <a href="/" aria-label="Link to main page">
          <svg className="logo-icon">
            <use href="/icons/icons.svg#logo-icon"></use>
          </svg>
        </a>
        <button aria-label="Open and close menu">
          <svg className="burger-icon">
            <use href="/icons/icons.svg#burger-icon"></use>
          </svg>
        </button>
      </div>

      <Menu />
    </header>
  );
};
