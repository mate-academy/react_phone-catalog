import { useContext } from 'react';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { StateContext } from '../../../context/ItemProvider';
import productsData from '../../../../public/api/products.json';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Aside: React.FC<Props> = ({ isOpen, onClose }) => {
  const { totalCount, fav } = useContext(StateContext);
  const { pathname } = useLocation();
  const match = matchPath('/product/:productId', pathname);
  const currentProductId = match?.params.productId;
  const currentProduct = currentProductId
    ? productsData.find(p => p.itemId === currentProductId)
    : null;
  const currentCategory = currentProduct?.category;
  const getLinkClass = (categoryPath: string, categoryName: string) => {
    return ({ isActive }: { isActive: boolean }) => {
      const isCurrent = isActive || currentCategory === categoryName;

      return `menu-center__nav ${isCurrent ? 'nav-active' : ''}`;
    };
  };

  return (
    <aside className={`menu ${isOpen ? 'menu--open' : ''}`} id="menu">
      <div className="menu__content">
        <div className="menu-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `menu-center__nav ${isActive ? 'nav-active' : ''}`
            }
          >
            home
          </NavLink>
          <NavLink to="../phones" className={getLinkClass('phones', 'phones')}>
            phones
          </NavLink>
          <NavLink
            to="../tablets"
            className={getLinkClass('tablets', 'tablets')}
          >
            tablets
          </NavLink>
          <NavLink
            to="../accessories"
            className={getLinkClass('accessories', 'accessories')}
          >
            accessories
          </NavLink>
        </div>
        <div className="menu-bottom">
          <div className="menu-bottom__left">
            {fav.length > 0 ? (
              <NavLink
                to="favourites"
                onClick={onClose}
                className={({ isActive }) =>
                  `menu-bottom__favs ${isActive ? 'cart-active' : ''}`
                }
              >
                <span className="menu-bottom__favs--count">{fav.length}</span>
              </NavLink>
            ) : (
              <NavLink
                to="favourites"
                onClick={onClose}
                className={({ isActive }) =>
                  `menu-bottom__fav ${isActive ? 'cart-active' : ''}`
                }
              ></NavLink>
            )}
          </div>
          <div className="menu-bottom__right">
            {totalCount > 0 ? (
              <NavLink
                to="cart"
                onClick={onClose}
                className={({ isActive }) =>
                  `menu-bottom__carts ${isActive ? 'cart-active' : ''}`
                }
              >
                <span className="menu-bottom__carts--count">{totalCount}</span>
              </NavLink>
            ) : (
              <NavLink
                to="cart"
                onClick={onClose}
                className={({ isActive }) =>
                  `menu-bottom__cart ${isActive ? 'cart-active' : ''}`
                }
              ></NavLink>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
