import { useContext, useState } from 'react';
import useMediaQuery from '../../../utils/useMediaQuery';
import { Icon } from '../../base/Icon/Icon.component';
import { Nav } from '../../base/Nav/Nav.component';
import cn from 'classnames';
import { StatesContext } from '../../../store/GlobalStateProvider';

export const Header = () => {
  const { cart, favorites } = useContext(StatesContext);
  const isMobile = useMediaQuery('(max-width: 640px');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log(isMenuOpen); // TODO REMOVE AFTER TESTS

    return isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
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
              <Icon
                iconUse="bar"
                iconType="favorite"
                length={favorites.length}
                border
              />
              <Icon iconUse="bar" iconType="cart" length={cart.length} border />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
