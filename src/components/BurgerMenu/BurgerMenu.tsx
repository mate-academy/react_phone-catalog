import { NavLink } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';
import { FavoritesAndCarts } from '../FavoritesAndCarts';

import cn from 'classnames';

import './burgerMenu.scss';

interface Props {
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export const BurgerMenu: React.FC<Props> = ({ setIsActive }) => {
  const handle = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const target = e.target as HTMLElement;

    const link = target.closest('a');

    if (link) {
      setIsActive(false);
    }
  };

  const getClassNames = ({ isActive }: { isActive: boolean }) => {
    return cn('burger-menu__link', { 'burger-menu__link--active': isActive });
  };

  return (
    <div className="burger-menu">
      <nav className="burger-menu__nav" onClick={e => handle(e)}>
        <NavLink to="/home" className={getClassNames}>
          home
        </NavLink>
        <NavLink to="/phones" className={getClassNames}>
          phones
        </NavLink>
        <NavLink to="/tablets" className={getClassNames}>
          tablets
        </NavLink>
        <NavLink to="/accessories" className={getClassNames}>
          accessories
        </NavLink>
      </nav>

      <FavoritesAndCarts handle={handle} />
    </div>
  );
};
