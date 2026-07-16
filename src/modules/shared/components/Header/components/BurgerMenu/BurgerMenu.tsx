import React from 'react';
import './BurgerMenu.scss';
import { Navbar } from '../Navbar';
import { ButtonHeader } from '../ButtonHeader';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../../../../../context/GlobalContext';
import { AllAvailablePages } from '../../../../../../types/allAvailablePages';

type Props = {
  className: string;
  closeMenu: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ className, closeMenu }) => {
  const navigate = useNavigate();
  const { cartItems, favouritesItems } = useGlobalContext();

  const openPage = (path: AllAvailablePages) => {
    navigate(path);
  };

  return (
    <div className={`burger-menu ${className}`}>
      <div className="burger-menu__body">
        <Navbar className="burger-menu__navbar" closeMenu={() => closeMenu()} />
      </div>
      <div className="burger-menu__footer">
        <ButtonHeader
          className="burger-menu__button"
          onClick={() => {
            openPage('/favourites');
            closeMenu();
          }}
          name="heart-like"
          kind="favourites"
          showGuantity={favouritesItems.length > 0}
        />
        <ButtonHeader
          className="burger-menu__button"
          onClick={() => {
            openPage('/cart');
            closeMenu();
          }}
          name="shopping-bag"
          kind="cart"
          showGuantity={cartItems.length > 0}
        />
      </div>
    </div>
  );
};
