import classNames from 'classnames';
import { NavMenu } from '../NavMenu';
import { RightButtons } from '../RightButtons';
import s from './BurgerMenu.module.scss';

type Props = {
  burgerMenu?: boolean;
};

export const BurgerMenu: React.FC<Props> = ({ burgerMenu = false }) => {
  return (
    <div
      className={classNames(s.burger, {
        [s.onMobile]: burgerMenu,
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
