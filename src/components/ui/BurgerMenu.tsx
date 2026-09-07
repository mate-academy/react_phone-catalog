import { NavLink, Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';

const BurgerMenu = () => {
  const { cart } = useContext(CartContext);

  const { favourites } = useContext(ProductContext);

  return (
    <div
      className="fixed top-16 left-0 w-full h-[calc(100vh-63px)]
     z-40 bg-white flex flex-col items-center justify-between"
    >
      <nav className="px-4 py-6">
        <ul
          className="flex uppercase items-center font-bold 
        text-gray-400 flex-col gap-4"
        >
          <li>
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                isActive ? 'header__is-active' : ''
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/phones'}
              className={({ isActive }) =>
                isActive ? 'header__is-active' : ''
              }
            >
              Phones
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/tablets'}
              className={({ isActive }) =>
                isActive ? 'header__is-active' : ''
              }
            >
              Tablets
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/accessories'}
              className={({ isActive }) =>
                isActive ? 'header__is-active' : ''
              }
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex w-full">
        <div
          className="w-full h-16 flex justify-center 
        items-center border border-gray-300"
        >
          <Link to={'/cart'}>
            <div className="relative">
              <div
                className="text-[10px] border text-white 
              border-gray-400 absolute top-[-50%] right-[-50%]
               text-center bg-red-500 rounded-full w-[14px] 
               h-[14px] flex items-center justify-center"
              >
                {Object.keys(cart).length}
              </div>
              <img src="/img/icons/Shopping bag (Cart).svg" alt="cart" />
            </div>
          </Link>
        </div>
        <div
          className="w-full justify-center items-center
         border border-gray-300 h-16 flex"
        >
          <Link to={'/favourites'}>
            <div className="relative">
              <div
                className="text-[10px] border text-white 
              border-gray-400 absolute top-[-50%] right-[-50%] 
              text-center bg-red-500 rounded-full w-[14px] 
              h-[14px] flex items-center justify-center"
              >
                {favourites.length}
              </div>
              <img
                src="/img/icons/Favourites (Heart Like).svg"
                alt="favourites"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
