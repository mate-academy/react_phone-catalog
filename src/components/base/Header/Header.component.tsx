import { useContext } from 'react';
import useMediaQuery from '../../../utils/useMediaQuery';
import { Icon } from '../../base/Icon/Icon.component';
import { Nav } from '../../base/Nav/Nav.component';
import cn from 'classnames';
import {
  DispatchContext,
  StatesContext,
} from '../../../store/GlobalStateProvider';
import { Link } from 'react-router-dom';

export const Header = () => {
  const dispatch = useContext(DispatchContext);
  const { isMenuOpen } = useContext(StatesContext);
  const { cart, favorites } = useContext(StatesContext);
  const isMobile = useMediaQuery('(max-width: 640px');
  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log(isMenuOpen); // TODO REMOVE AFTER TESTS
    if (isMenuOpen) {
      dispatch({ type: 'isMenuOpen', payload: false });
    } else {
      dispatch({ type: 'isMenuOpen', payload: true });
    }

    return isMenuOpen;
  };

  return (
    <header>
      <div className="topbar" id="top">
        <div className="topbar__logo-container">
          <img src="/img/logo.svg" />
        </div>
        <div className="topbar__nav-container">
          {!isMobile && <Nav navStyle="bar" />}
        </div>
        <div className="topbar__icons-container">
          {isMobile ? (
            <a href={cn({ '#menu': isMenuOpen, '#top': !isMenuOpen })}>
              <Icon
                iconUse="bar"
                iconType={cn({ menu: !isMenuOpen, close: isMenuOpen })}
                onClick={handleClick}
                border
              />
            </a>
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
              <Icon iconUse="bar" iconType="cart" length={cart.length} border />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
