import { Link } from 'react-router-dom';
import { NavMenu } from '../NavMenu';
import { RightButtons } from '../RightButtons';
import s from './Header.module.scss';

export const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.nav__wrapper}>
        <div className={s.nav__logo}>
          <Link to="/">
            <img
              src="./img/logo/NiceGadgets.svg"
              alt="logo"
              className={s.header__logo}
            />
          </Link>
        </div>

        <NavMenu />
      </div>
      <RightButtons />
    </div>
  );
};
