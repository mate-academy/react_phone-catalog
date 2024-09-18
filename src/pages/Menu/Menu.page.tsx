import { Link } from 'react-router-dom';
import { Icon } from '../../components/base/Icon/Icon.component';
import { Nav } from '../../components/base/Nav/Nav.component';
import { useContext } from 'react';
import {
  DispatchContext,
  StatesContext,
} from '../../store/GlobalStateProvider';

export const MenuPage = () => {
  const { favorites, cart, isMenuOpen } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);
  const handleClick = () => {
    if (isMenuOpen) {
      dispatch({ type: 'isMenuOpen', payload: false });
    } else {
      dispatch({ type: 'isMenuOpen', payload: true });
    }

    return isMenuOpen;
  };

  return (
    <>
      <div className="menu__container">
        <div className="menu__container-nav">
          <Nav navStyle="menu" />
        </div>
        <div className="menu__container-icons">
          <Link
            to="/favorites"
            className="menu__container-link"
            onClick={handleClick}
          >
            <Icon
              iconUse="menu-page"
              iconType="favorite"
              length={favorites.length}
            />
          </Link>
          <Link
            to="/cart"
            className="menu__container-link"
            onClick={handleClick}
          >
            <Icon iconUse="menu-page" iconType="cart" length={cart.length} />
          </Link>
        </div>
      </div>
    </>
  );
};
