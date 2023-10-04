import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { pages } from 'routing';
import './BurgerMenu.scss';
import { BurgerIcon } from 'components/ui-kit/BurgerIcon';

const NAV_LINKS_TO_HIDE = ['*', 'cart', 'favourites', 'productId'];

export const BurgerMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation().pathname;

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  return (
    <div className="burger-menu">
      <BurgerIcon
        onClick={setShowMenu}
        isOpen={showMenu}
      />

      {showMenu && (
        <nav className="burger-menu__nav">
          {Object.keys(pages).map(link => {
            if (!NAV_LINKS_TO_HIDE.includes(link)) {
              return (
                <NavLink
                  key={link}
                  to={link}
                  className="burger-menu__link"
                  onClick={() => setShowMenu(false)}
                >
                  {link}
                </NavLink>
              );
            }

            return null;
          })}
        </nav>
      )}
    </div>
  );
};
