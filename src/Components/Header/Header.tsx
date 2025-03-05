import { NavMenu } from '../NavMenu';
import { RightButtons } from '../RightButtons';
import s from './Header.module.scss';

export const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.nav__wrapper}>
        <div className={s.nav__logo}>
          <a href="/">
            <img
              src="./img/logo/NiceGadgets.svg"
              alt="logo"
              className={s.header__logo}
            />
          </a>
        </div>

        <NavMenu />
      </div>
      <RightButtons />
    </div>
  );
};
