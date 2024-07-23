import cn from 'classnames';
import style from './Aside.module.scss';
import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../store';

const getActiveLink = ({ isActive }: { isActive: boolean }) =>
  cn(style.menu__link, {
    [style['menu__link--active']]: isActive,
  });

const getActiveIconLike = ({ isActive }: { isActive: boolean }) =>
  cn(style.menu__bottom__icon, style.menu__bottom__icon__like, {
    [style['menu__bottom__icon--active']]: isActive,
  });

const getActiveIconCart = ({ isActive }: { isActive: boolean }) =>
  cn(style.menu__bottom__icon, style.menu__bottom__icon__cart, {
    [style['menu__bottom__icon--active']]: isActive,
  });

const navItems = [
  { path: '/', name: 'Home' },
  { path: 'phones', name: 'Phones' },
  { path: 'tablets', name: 'Tablets' },
  { path: 'accessories', name: 'Accessories' },
];

export const Aside: React.FC = () => {
  const { isMenuActive, setIsMenuActive } = useContext(AppContext);

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
      <nav className={style.menu__nav}>
        <ul className={style.menu__list}>
          {navItems.map(({ path, name }) => (
            <li key={name} className={style.menu__item}>
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
          className={getActiveIconLike}
          onClick={() => setIsMenuActive(false)}
        />
        <NavLink
          to={'cart'}
          className={getActiveIconCart}
          onClick={() => setIsMenuActive(false)}
        />
      </div>
    </aside>
  );
};
