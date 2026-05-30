import { Link } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import { Nav } from '../Nav/Nav';
import useMediaQuery from '../../utils/useMediaQuery';
import { useContext } from 'react';
import { DispatchContext, StatesContext } from '../store/GlobalStateProvider';
import cn from 'classnames';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const { isMenuOpen } = useContext(StatesContext);
  const { favorites, totalCartItems } = useContext(StatesContext);
  const isMobile = useMediaQuery('(max-width: 640px');
  const handleClick = () => {
    if (isMobile) {
      if (isMenuOpen) {
        dispatch({ type: 'isMenuOpen', payload: false });
      } else {
        dispatch({ type: 'isMenuOpen', payload: true });
      }
    }

    return isMenuOpen;
  };

  return (
    <header>
      <div className="topbar" id="top">
        <div className="topbar__logo-container">
          <img src="../img/header (2).png" />
        </div>
        <div className="topbar__nav-container">
          {!isMobile && <Nav navStyle="bar" />}
        </div>
        <div className="topbar__icons-container">
          {isMobile ? (
            <Icon
              iconUse="bar"
              iconType={cn({ menu: !isMenuOpen, close: isMenuOpen })}
              onClick={handleClick}
              border
            />
          ) : (
            <>
              <Link to="/favorites">
                <Icon
                  iconUse="bar"
                  iconType="favorite"
                  length={favorites.length}
                  border
                />
              </Link>
              <Link to="/cart">
                <Icon
                  iconUse="bar"
                  iconType="cart"
                  length={totalCartItems}
                  border
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
