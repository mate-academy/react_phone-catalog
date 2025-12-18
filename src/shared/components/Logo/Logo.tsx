import classes from './Logo.module.scss';
import logoSrc from '../../assets/icons/logo.svg';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/">
      <img className={classes.logo} src={logoSrc} alt="Logo" />
    </Link>
  );
};
