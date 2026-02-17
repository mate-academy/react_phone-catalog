import { NavLink } from 'react-router-dom';
import { LikeIcon } from '../../images/icons/LikeIcon';
import { CartIcon } from '../../images/icons/CartIcon';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';

export const CustomerBar = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('CustomerBar must be used inside CartProvider');
  }

  const favouritesCount = cartContext.favorites.length;
  const cartCount = cartContext.getTotalItems();

  return (
    <div className="customerBar flex flex-row items-center  h-full  border-l border-r border-elements dark:border-gray-700">
      <NavLink
        to={'/favourites'}
        className="flex justify-center items-center w-12 h-full tablet:w-12 desktop:w-16 mobile:hidden tablet:flex transition-colors border border-elements dark:border-primary   hover:bg-[#dfe1e4] dark:hover:bg-[#202937] dark:hover:border-purple"
        aria-label="Favourites"
      >
        <LikeIcon favouritesCount={favouritesCount} />
      </NavLink>
      <NavLink
        to={'/cart'}
        className="flex justify-center items-center w-12 h-full tablet:w-12 desktop:w-16 mobile:hidden tablet:flex transition-colors border border-elements  dark:border-primary  hover:bg-[#dfe1e4] dark:hover:bg-[#202937] dark:hover:border-purple"
        aria-label="Cart"
      >
        <CartIcon cartCount={cartCount} />
      </NavLink>
      <BurgerMenu
        favouritesCount={favouritesCount}
        cartCount={cartCount}
      />
    </div>
  );
};
