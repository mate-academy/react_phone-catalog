import { useState } from 'react';
import './BurgerMenu.scss';
import { MobileMenu } from '../MobileMenu/MobileMenu';

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="burgermenu">
        {isOpen ? (
          <button
            type="submit"
            onClick={() => setIsOpen(false)}
            className="burgermenu_icon-close"
            aria-label="closemenu"
          />
        ) : (
          <button
            type="submit"
            onClick={() => setIsOpen(true)}
            className="burgermenu_icon"
            aria-label="openmenu"
          />
        )}
      </div>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
