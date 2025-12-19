import classes from './Logo.module.scss';
import logoSrc from '/assets/icons/both_theme/logo.svg';

export const Logo = () => {
  return <img className={classes.logo} src={logoSrc} alt="Logo" />;
};
