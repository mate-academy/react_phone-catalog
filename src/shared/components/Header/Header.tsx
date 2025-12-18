import { Logo } from '../Logo';
import classes from './Header.module.scss';

export const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.header__left}>
        <div className={classes.header__logo}>
          <Logo />
        </div>
      </div>
      <div className={classes.header__right}>
        <div className={classes.header__logo}>
          <Logo />
        </div>
      </div>

      {/* <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">Home</li>
          <li className="navigation__item">Catalog</li>
          <li className="navigation__item">About</li>
          <li className="navigation__item">Contacts</li>
        </ul>
      </nav> */}
    </header>
  );
};
