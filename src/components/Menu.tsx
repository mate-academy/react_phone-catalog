import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Cart from '/src/assets/icons/cart.svg?react';
import Favourites from '/src/assets/icons/favourites.svg?react';

export const Menu: FC = () => {
  return (
    <aside className="opacity-0 pointer-events-none fixed left-0 right-0 min-h-[calc(100dvh - 48px)] lg:min-h-[calc(100dvh - 64px)]">
      <div className="">
        <NavLink to="favourites" className="">
          <Favourites className="fill-primary" />
        </NavLink>

        <NavLink to="cart" className="">
          <Cart className="fill-primary" />
        </NavLink>
      </div>
    </aside>
  );
};
