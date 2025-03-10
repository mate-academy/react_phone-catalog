import { Link } from 'react-router-dom';
import s from './Logo.module.scss';

export const Logo = () => (
  <div className={s.nav__logo_wrapper}>
    <Link to="/">
      <img
        src="./img/logo/NiceGadgets.svg"
        alt="logo"
        className={s.nav__logo}
      />
      <img src="./img/logo/ok.png" alt="ok" className={s.nav__logo_ok} />
    </Link>
  </div>
);
