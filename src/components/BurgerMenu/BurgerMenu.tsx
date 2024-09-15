import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  burgerMenu: boolean;
  setBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BurgerMenu: React.FC<Props> = ({ burgerMenu, setBurgerMenu }) => {
  return (
    <div className="burger-menu">
      <div className="burger-menu--text">
        <Link className='burger-menu--text-button' onClick={() => setBurgerMenu(!burgerMenu)} to="/">
          HOME
        </Link>

        <Link className='burger-menu--text-button' onClick={() => setBurgerMenu(!burgerMenu)} to="/phones">
          PHONES
        </Link>

        <Link className='burger-menu--text-button' onClick={() => setBurgerMenu(!burgerMenu)} to="/tablets">
          TABLETS
        </Link>

        <Link className='burger-menu--text-button' onClick={() => setBurgerMenu(!burgerMenu)} to="/accessories">
          ACCESSORIES
        </Link>
      </div>

      <div className="burger-menu--button">
        <img src="./img/Favourites.svg" alt="Favourites" />
        <Link to='/favourites'></Link>
        <img src="./img/Cart.svg" alt="Cart" />
        <Link to='/cart'></Link>
      </div>
    </div>
  );
};
