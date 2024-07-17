import logo from '../../assets/img/logos/mainlogo.svg';
import menu from '../../assets/img/icons/menu.svg';
import style from './TopBar.module.scss';

export const TopBar = () => (
  <div className={style.topbar}>
    <div>
      <img src={logo} alt="logo" className={style.topbar__logo} />
    </div>
    <div className={style.topbar__burgerMenuContainer}>
      <img src={menu} alt="menu" className={style.topbar__burgerMenu} />
    </div>
  </div>
);
