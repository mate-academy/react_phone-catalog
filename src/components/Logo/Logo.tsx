import { NavLink } from 'react-router-dom';
import style from './Logo.module.scss';

export const Logo = () => (
  <div className={style.logo__wrapper}>
    <NavLink to="/" className={style.logo}>
      <img src="img/logo/Logo.svg" alt="Nice gadgets logo" />
    </NavLink>
  </div>
);
