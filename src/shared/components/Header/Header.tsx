import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import classes from './Header.module.scss';
import { Navigation } from '../Navigation';

export const Header = () => {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.header__logo}>
        <Logo />
      </Link>

      <Navigation />

      <div className={classes.header__action_button}>
        <span className="icon icon--burger" />
      </div>
    </header>
  );
};
