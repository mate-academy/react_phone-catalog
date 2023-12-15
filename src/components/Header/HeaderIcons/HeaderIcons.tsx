import { useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { MainContext } from '../../../context/MainContext';
import { HeaderIcons as Icons } from '../../../types/HeaderIcons';

export const HeaderIcons = () => {
  const { favouritesItems, cartItems } = useContext(MainContext);

  const headerIcons: Icons[] = useMemo(() => {
    return [
      {
        id: 0,
        path: 'favourites',
        icon: './img/like.svg',
        counter: favouritesItems.length,
      },
      {
        id: 1,
        path: 'cart',
        icon: './img/cart.svg',
        counter: cartItems.length,
      },
    ];
  }, [favouritesItems, cartItems]);

  const setActiveClass = ({ isActive }: { isActive: boolean }) => {
    return cn('header__icon', { 'header__icon--active': isActive });
  };

  return (
    <div className="header__icons">
      {headerIcons.map((icon) => (
        <NavLink to={icon.path} className={setActiveClass} key={icon.id}>
          <div className="header__imgs">
            {icon.counter > 0 && (
              <span className="header__counter">{icon.counter}</span>
            )}
            <img
              className="header__img"
              src={icon.icon}
              alt="header-icon"
              loading="lazy"
            />
          </div>
        </NavLink>
      ))}
    </div>
  );
};
