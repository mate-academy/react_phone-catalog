import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const NavIcons: FC = () => {
  return (
    <>
      <NavLink to="/favorites">
        <img src="img/Icons/Favourites.svg" alt="Favourites" />
      </NavLink>

      <NavLink to="/cart">
        <img src="img/Icons/Cart.svg" alt="Cart" />
      </NavLink>
    </>
  );
};
