import { useState } from 'react';
import './burgerMenu.scss';

export const BurgerMenu = () => {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  return (
    <div className="burgermenu">
      {isActiveMenu ? (
        <button
          type="submit"
          onClick={() => setIsActiveMenu(false)}
        >
          <img
            src="new/img/icons/close.svg"
            alt="burger-menu"
            className="burgermenu__icon-close"
          />
        </button>
      ) : (
        <button
          type="submit"
          onClick={() => setIsActiveMenu(true)}
        >
          <img
            src="new/img/icons/menu.svg"
            alt="burger-menu"
            className="burgermenu__icon"
          />
        </button>
      )}
    </div>
  );
};
