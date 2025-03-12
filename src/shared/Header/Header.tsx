import { NavMenu } from './Components/NavMenu';
import { RightButtons } from './Components/RightButtons';
import s from './Header.module.scss';
import { BurgerMenu } from './Components/BurgerMenu';
import { Logo } from '../Logo';

export const Header = () => {
  return (
    <>
      <div className={s.header}>
        <div className={s.nav__wrapper}>
          <Logo />

          <NavMenu />
        </div>
        <RightButtons />
      </div>
      <BurgerMenu />
    </>
  );
};
