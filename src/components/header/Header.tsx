import React, { useContext } from 'react';
import Logo from '../ui/Logo';
import { Link, NavLink } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { ProductContext } from '../../context/ProductContext';
import BurgerMenu from '../ui/BurgerMenu';

const Header: React.FC = () => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  const { cart } = useContext(CartContext);

  const { favourites } = useContext(ProductContext);

  return (
    <header
      className="m-0 h-16 w-full flex justify-between
    sticky top-0 z-50 bg-white/80 backdrop-blur-md
    flex-row font-mont font-semibold border border-gray-400 items-center"
    >
      <Link to="/" onClick={() => setMenuIsOpen(false)}>
        <Logo />
      </Link>

      <nav className="flex sm:w-full justify-between">
        <ul
          className=" hidden sm:flex uppercase text-gray-500 
        text-sm mx-6 flex-row items-center gap-8 sm:gap-16"
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'header__is-active' : ''
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive ? 'header__is-active' : ''
              }
            >
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive ? 'header__is-active' : ''
              }
            >
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive ? 'header__is-active' : ''
              }
            >
              Accessories
            </NavLink>
          </li>
        </ul>

        <div className="hidden sm:flex">
          <NavLink
            to="/favourites"
            className={({ isActive }) => (isActive ? 'options__is-active' : '')}
          >
            <div
              className="w-16 h-16 flex after:rounded-full after:bg-red-600 
             items-center justify-center relative border-l 
             border-r border-gray-200"
            >
              {favourites.length > 0 && (
                <div
                  className="text-[10px] border text-white 
                border-gray-400 text-center bg-red-500 rounded-full 
                absolute top-[20%] right-[20%] w-[14px] h-[14px] flex 
                items-center justify-center"
                >
                  {favourites.length}
                </div>
              )}
              <img
                src="/img/icons/Favourites (Heart Like).svg"
                alt="favourites"
              />
            </div>
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive }) => (isActive ? 'options__is-active' : '')}
          >
            <div
              className="w-16 h-16 flex items-center justify-center
             relative border-l border-r border-gray-200"
            >
              {Object.keys(cart).length > 0 && (
                <div
                  className="text-[10px] border text-white 
                border-gray-400 absolute top-[20%] right-[20%] 
                text-center bg-red-500 rounded-full w-[14px] h-[14px] 
                flex items-center justify-center"
                >
                  {Object.keys(cart).length}
                </div>
              )}
              <img src="/img/icons/Shopping bag (Cart).svg" alt="cart" />
            </div>
          </NavLink>
        </div>
        <div
          className="flex m-0 p-0 items-center justify-center 
        w-16 h-16 border-l border-r border-gray-200 sm:hidden"
        >
          <button
            onClick={event => {
              event.stopPropagation();
              setMenuIsOpen(!menuIsOpen);
            }}
          >
            <img
              className="w-4 h-4"
              src={
                menuIsOpen ? '/img/icons/X button.svg' : '/img/icons/burger.svg'
              }
              alt="menu"
            />
          </button>
        </div>
      </nav>
      {menuIsOpen && <BurgerMenu />}
    </header>
  );
};

export default Header;
