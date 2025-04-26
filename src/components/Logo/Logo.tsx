import { NavLink } from "react-router-dom";
import styles from './LogoStyles.module.scss';

export function Logo() {
  return (
    <NavLink to="/">
      <img src="/img/Logo.svg" className={styles.logo} alt="Логотип" />
    </NavLink>
  );
}
