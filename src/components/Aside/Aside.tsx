import cn from 'classnames';
import style from './Aside.module.scss';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { MenuContext } from '../../store/MenuProvider';
import like from '../../assets/img/icons/like.svg';
import cartImg from '../../assets/img/icons/cart.svg';
import { FavouritesContext } from '../../store/FavouritesProvider';
import { CartContext } from '../../store/CartProvider';

const getActiveLink = ({ isActive }: { isActive: boolean }) =>
  cn(style.nav__link, {
    [style['nav__link--active']]: isActive,
  });

const getActiveIcon = ({ isActive }: { isActive: boolean }, iconName: string) =>
  cn(style.menu__bottom__icon, style[`menu__bottom__icon__${iconName}`], {
    [style['menu__bottom__icon--active']]: isActive,
  });

const navItems = [
  { path: '/', name: 'Home' },
  { path: 'phones', name: 'Phones' },
  { path: 'tablets', name: 'Tablets' },
  { path: 'accessories', name: 'Accessories' },
];

export const Aside: React.FC = () => {
  const { isMenuActive, setIsMenuActive } = useContext(MenuContext);
  const { favourites } = useContext(FavouritesContext);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 639 && isMenuActive) {
        setIsMenuActive(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuActive, setIsMenuActive]);

  return (
    <aside
      className={cn(style.menu, {
        [style['menu--active']]: isMenuActive,
      })}
    >
      <nav className={style.nav}>
        <ul className={style.nav__list}>
          {navItems.map(({ path, name }) => (
            <li key={name} className={style.nav__item}>
              <NavLink
                to={path}
                className={getActiveLink}
                onClick={() => setIsMenuActive(false)}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={style.menu__bottom}>
        <NavLink
          to={'favourites'}
          className={({ isActive }) => getActiveIcon({ isActive }, 'like')}
          onClick={() => setIsMenuActive(false)}
        >
          <img src={like} className={style.menu__bottom__icon__img} />
          {!!favourites.length && (
            <span className={style.menu__bottom__icon__count}>
              {favourites.length}
            </span>
          )}
        </NavLink>
        <NavLink
          to={'cart'}
          className={({ isActive }) => getActiveIcon({ isActive }, 'cart')}
          onClick={() => setIsMenuActive(false)}
        >
          <img src={cartImg} className={style.menu__bottom__icon__img} />
          {!!cart.length && (
            <span className={style.menu__bottom__icon__count}>
              {cart.length}
            </span>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
