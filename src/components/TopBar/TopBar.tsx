import logo from '../../assets/img/logos/mainlogo.svg';
import style from './TopBar.module.scss';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import like from '../../assets/img/icons/like.svg';
import cart from '../../assets/img/icons/cart.svg';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Aside } from '../Aside';
import { useContext } from 'react';
import { AppContext } from '../../store';

const getActiveNavLink = ({ isActive }: { isActive: boolean }) =>
  cn(style.topbar__nav__link, {
    [style['topbar__nav__link--active']]: isActive,
  });

const getActiveIconLike = ({ isActive }: { isActive: boolean }) =>
  cn(`${style.topbar__iconContainer} ${style.topbar__iconLike}`, {
    [style['topbar__iconContainer--active']]: isActive,
  });

const getActiveIconCart = ({ isActive }: { isActive: boolean }) =>
  cn(`${style.topbar__iconContainer} ${style.topbar__iconCart}`, {
    [style['topbar__iconContainer--active']]: isActive,
  });

const navItems = [
  { path: '/', name: 'Home' },
  { path: 'phones', name: 'Phones' },
  { path: 'tablets', name: 'Tablets' },
  { path: 'accessories', name: 'Accessories' },
];

export const TopBar = () => {
  const { isMenuActive, setIsMenuActive } = useContext(AppContext);

  return (
    <>
      <div className={style.topbar}>
        <div className={style.topbar__left}>
          <NavLink to={'home'} className={style.topbar__logo__link}>
            <img src={logo} alt="logo" className={style.topbar__logo} />
          </NavLink>
          <nav className={style.topbar__nav}>
            <ul className={style.topbar__nav__list}>
              {navItems.map(({ path, name }) => (
                <li key={name} className={style.topbar__nav__item}>
                  <NavLink to={path} className={getActiveNavLink}>
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={style.topbar__right}>
          <NavLink to={'favourites'} className={getActiveIconLike}>
            <img src={like} className={style.topbar__icon} />
          </NavLink>

          <NavLink to={'cart'} className={getActiveIconCart}>
            <img src={cart} className={style.topbar__icon} />
          </NavLink>

          <div
            className={`${style.topbar__iconContainer} ${style.topbar__burgerMenu}`}
            onClick={() => setIsMenuActive(!isMenuActive)}
          >
            {isMenuActive ? (
              <AiOutlineClose className={style.topbar__icon} />
            ) : (
              <AiOutlineMenu className={style.topbar__icon} />
            )}
          </div>
        </div>
      </div>
      <Aside />
    </>
  );
};
