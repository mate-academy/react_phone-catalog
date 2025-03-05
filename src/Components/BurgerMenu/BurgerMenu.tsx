import classNames from 'classnames';
import { NavMenu } from '../NavMenu';
import { RightButtons } from '../RightButtons';
import s from './BurgerMenu.module.scss';
import { useContext } from 'react';
import { BurgerContext } from '../../context/BurgerContext';

export const BurgerMenu = () => {
  const { burgerMenuActivate } = useContext(BurgerContext);

  return (
    <div
      className={classNames(s.burger, {
        [s.onMobile]: burgerMenuActivate,
      })}
    >
      <div className={s.burger__wrapper}>
        <div className={s.burger__logo}>
          <a href="/">
            <img
              src="./img/logo/NiceGadgets.svg"
              alt="logo"
              className={s.header__logo}
            />
          </a>
        </div>

        <div className={s.right__buttons}>
          <div className={s.right__buttons_close}>
            <a href="">
              <img src="./img/icons/close.png" alt="close" />
            </a>
          </div>
        </div>
      </div>
      <NavMenu burgerMenu={true} />
      <RightButtons burgerMenu={true} />
    </div>
  );
};
