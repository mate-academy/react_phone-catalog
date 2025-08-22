// import './burger-navigation.scss';
// import { Link } from 'react-router-dom';
// import { useCurrentPath } from '../contexts/PathContext';
// import cn from 'classnames';
// import { AddAndFavoritesContext } from '../contexts/AddAndFavoritesContext';
// import { useContext } from 'react';

// type Props = {
//   isBurgerMenu: boolean;
//   onClose: () => void;
// };

// export const BurgerNavigation: React.FC<Props> = ({
//   isBurgerMenu,
//   onClose,
// }) => {
//   const { pathname, search } = useCurrentPath(); // ← теперь получаем и pathname, и search из контекста
//   const context = useContext(AddAndFavoritesContext);
//   const { favorites, cart } = context;

//   const pages = [
//     { title: 'HOME', path: '/' },
//     { title: 'PHONES', path: '/phones' },
//     { title: 'TABLETS', path: '/tablets' },
//     { title: 'ACCESSORIES', path: '/accessories' },
//   ];


//   const itemInFavorites = favorites.length;
//   const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <nav className={`burger-navigation ${isBurgerMenu ? 'is-open' : ''}`}>
//       <div className="burger-container">
//         <ul className="burger-list">
//           {pages.map(({ title, path }) => (
//             <li className="burger-list-item" key={title}>
//               <Link
//                 className={cn('burger-link', {
//                   'is-active':
//                     path === '/' ? pathname === '/' : pathname.startsWith(path),
//                 })}
//                 to={{ pathname: path, search }} // ← сохраняем текущие параметры при переходе
//                 onClick={onClose}
//               >
//                 {title}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <div className="burger-footer">
//           <div
//             className={cn('burger-icon-container', {
//               'is-active': pathname === '/favorites',
//             })}
//           >
//             <Link
//               to={{ pathname: '/favorites', search }}
//               className="burger-footer-link"
//               onClick={onClose}
//             >
//               <img
//                 src="/img/icons/FavoritesHeartLike.svg"
//                 alt="Favorites icon"
//                 className="icon"
//               />

//               {itemInFavorites > 0 && (
//                 <div className="quantity-box">
//                   <div className="quantity">{itemInFavorites}</div>
//                 </div>
//               )}
//             </Link>
//           </div>

//           {/* <div className="burger-icon-container"> */}
//           <div
//             className={cn('burger-icon-container', {
//               'is-active': pathname === '/cart',
//             })}
//           >
//             <Link
//               to={{ pathname: '/cart', search }}
//               className="burger-footer-link"
//               onClick={onClose}
//             >
//               <img
//                 src="/img/icons/ShoppingBag.svg"
//                 alt="Shopping Bag icon"
//                 className="icon"
//               />

//               {totalQuantity > 0 && (
//                 <div className="quantity-box">
//                   <div className="quantity">{totalQuantity}</div>
//                 </div>
//               )}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };


import './burger-navigation.scss';
import { Link, useLocation } from 'react-router-dom';
import { useCurrentPath } from '../contexts/PathContext';
import cn from 'classnames';
import { AddAndFavoritesContext } from '../contexts/AddAndFavoritesContext';
import { useContext } from 'react';

type Props = {
  isBurgerMenu: boolean;
  onClose: () => void;
};

export const BurgerNavigation: React.FC<Props> = ({
  isBurgerMenu,
  onClose,
}) => {
  const { pathname, search } = useCurrentPath();
  const location = useLocation();
  const context = useContext(AddAndFavoritesContext);
  const { favorites, cart } = context;

  const STORAGE_KEY_LAST_PAGE = 'lastNonCartOrFavPage';

  const pages = [
    { title: 'HOME', path: '/' },
    { title: 'PHONES', path: '/phones' },
    { title: 'TABLETS', path: '/tablets' },
    { title: 'ACCESSORIES', path: '/accessories' },
  ];

  const itemInFavorites = favorites.length;
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const saveLastPage = () => {
    if (!location.pathname.startsWith('/cart') && !location.pathname.startsWith('/favorites')) {
      sessionStorage.setItem(
        STORAGE_KEY_LAST_PAGE,
        location.pathname + location.search,
      );
    }
  };

  return (
    <nav className={`burger-navigation ${isBurgerMenu ? 'is-open' : ''}`}>
      <div className="burger-container">
        <ul className="burger-list">
          {pages.map(({ title, path }) => (
            <li className="burger-list-item" key={title}>
              <Link
                className={cn('burger-link', {
                  'is-active':
                    path === '/' ? pathname === '/' : pathname.startsWith(path),
                })}
                to={{ pathname: path, search }}
                onClick={() => {
                  saveLastPage();
                  onClose();
                }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="burger-footer">
          <div
            className={cn('burger-icon-container', {
              'is-active': pathname === '/favorites',
            })}
          >
            <Link
              to="/favorites"
              className="burger-footer-link"
              onClick={() => {
                saveLastPage();
                onClose();
              }}
            >
              <img
                src="/img/icons/FavoritesHeartLike.svg"
                alt="Favorites icon"
                className="icon"
              />

              {itemInFavorites > 0 && (
                <div className="quantity-box">
                  <div className="quantity">{itemInFavorites}</div>
                </div>
              )}
            </Link>
          </div>

          <div
            className={cn('burger-icon-container', {
              'is-active': pathname === '/cart',
            })}
          >
            <Link
              to="/cart"
              className="burger-footer-link"
              onClick={() => {
                saveLastPage();
                onClose();
              }}
            >
              <img
                src="/img/icons/ShoppingBag.svg"
                alt="Shopping Bag icon"
                className="icon"
              />

              {totalQuantity > 0 && (
                <div className="quantity-box">
                  <div className="quantity">{totalQuantity}</div>
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
