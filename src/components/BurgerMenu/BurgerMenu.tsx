import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Logo } from '../Logo';
import { NavMenu } from '../NavMenu';
import { IconButton } from '../IconButton';
import './BurgerMenu.scss';

interface Props {
  onClose: () => void;
}

export const BurgerMenu: React.FC<Props> = ({ onClose }) => {
  const { favourites, cartQuantity } = useShop();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="burger-menu">
      <div className="burger-menu__top">
        <Link to="/" className="burger-menu__logo" onClick={onClose}>
          <Logo />
        </Link>

        <div className="burger-menu__close">
          <IconButton
            icon="close"
            variant="plain"
            ariaLabel="Close menu"
            onClick={onClose}
          />
        </div>
      </div>

      <div className="burger-menu__nav">
        <NavMenu variant="vertical" onLinkClick={onClose} />
      </div>

      <div className="burger-menu__bottom">
        <Link
          to="/favourites"
          className="burger-menu__bottom-action"
          onClick={onClose}
        >
          <IconButton
            icon="heart"
            variant="plain"
            ariaLabel="Favourites"
            badge={favourites.length}
          />
        </Link>
        <Link
          to="/cart"
          className="burger-menu__bottom-action"
          onClick={onClose}
        >
          <IconButton
            icon="cart"
            variant="plain"
            ariaLabel="Cart"
            badge={cartQuantity}
          />
        </Link>
      </div>
    </div>
  );
};
