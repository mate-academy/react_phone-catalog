import { useState } from 'react';
import './burgerMenu.scss';
import { MobileMenu } from '../MobileMenu';

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="burgermenu">
        {isOpen ? (
          <button
            type="submit"
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(true)}
          >
            <img
              src="new/img/icons/menu.svg"
              alt="burger-menu"
              className="burgermenu__icon"
            />
          </button>
        )}
      </div>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
