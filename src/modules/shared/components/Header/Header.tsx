import { Menu } from '../Menu/Menu';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <a href="/" aria-label="Link to main page">
          <svg className={styles.logoIcon}>
            <use href="/icons/icons.svg#logo-icon"></use>
          </svg>
        </a>
        <button aria-label="Open and close menu">
          <svg className={styles.burgerIcon}>
            <use href="/icons/icons.svg#burger-icon"></use>
          </svg>
        </button>
      </div>

      <Menu />
    </header>
  );
};
