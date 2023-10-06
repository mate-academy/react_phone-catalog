import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageNavLink } from '../PageNavLink/PageNavLink';
import './BurgerMenu.scss';

export const BurgerMenu: FC = () => {
  const location = useLocation();
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    setIsMenuClicked(prevState => !prevState);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      updateMenu();
    }
  };

  useEffect(() => {
    setIsMenuClicked(false);
  }, [location]);

  return (
    <div className="header__burger-menu burger-menu">
      <nav
        className="burger-menu__nav"
        role="navigation"
        aria-label="main navigation"
      >
        <div
          className="burger-menu__button"
          onClick={updateMenu}
          role="button"
          tabIndex={0}
          aria-label="burgerMenu"
          onKeyDown={handleKeyDown}
        >
          <div
            className={classNames(
              'burger-menu__line',
              { clicked: isMenuClicked },
              { unclicked: !isMenuClicked },
            )}
          />
          <div
            className={classNames(
              'burger-menu__line',
              { clicked: isMenuClicked },
              { unclicked: !isMenuClicked },
            )}
          />
          <div
            className={classNames(
              'burger-menu__line',
              { clicked: isMenuClicked },
              { unclicked: !isMenuClicked },
            )}
          />
        </div>
      </nav>

      <div className={classNames(
        'menu',
        { visible: isMenuClicked },
        { hidden: !isMenuClicked },
      )}
      >
        <div className="burger-menu-links">
          <PageNavLink url="/" title="home" />
          <PageNavLink url="/phones" title="Phones" />
          <PageNavLink url="/tablets" title="tablets" />
          <PageNavLink url="/accessories" title="accessories" />
        </div>
      </div>
    </div>
  );
};
