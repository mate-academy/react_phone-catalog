import { useState } from 'react';
import useMediaQuery from '../../utils/useMediaQuery';
import { Icon } from '../base/Icon/Icon.component';
import { Nav } from '../base/Nav/Nav.component';
import cn from 'classnames';

export const Header = () => {
  const isMobile = useMediaQuery('(max-width: 640px');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log(isMenuOpen); // REMOVE AFTER TESTS

    return isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  };

  return (
    <header>
      <div className="topbar">
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
              />
            </a>
          ) : (
            <>
              <Icon iconUse="bar" iconType="favorite" />
              <Icon iconUse="bar" iconType="cart" />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
