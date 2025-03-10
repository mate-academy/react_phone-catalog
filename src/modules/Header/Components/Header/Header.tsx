import { NavMenu } from '../NavMenu';
import { RightButtons } from '../RightButtons';
import s from './Header.module.scss';
import { useContext } from 'react';
import { BurgerMenu } from '../BurgerMenu';
import { BurgerContext } from '../../context/BurgerContext';
import { Logo } from '../../../shared/Logo';

export const Header = () => {
  const { burgerMenuActivate } = useContext(BurgerContext);

  return (
    <>
      <div className={s.header}>
        <div className={s.nav__wrapper}>
          <Logo />

          <NavMenu />
        </div>
        <RightButtons />
      </div>
      {burgerMenuActivate && <BurgerMenu />}
    </>
  );
};
