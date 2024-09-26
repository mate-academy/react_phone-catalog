import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
  burgerMenu: boolean;
  setBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header: React.FC<Props> = ({ burgerMenu, setBurgerMenu }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="nav">
        <Link to="/">
          <img className="nav__logo" src="./img/Logo.png" alt="Logo" />
        </Link>
        <img
          onClick={() => setBurgerMenu(!burgerMenu)}
          className="nav__menu"
          src="./img/Menu.png"
          alt="Menu"
        />

        <ul className='nav__button-n-t'>
          <li onClick={() => navigate('/')}>HOME</li>
          <li onClick={() => navigate('/phones')}>PHONES</li>
          <li onClick={() => navigate('/tablets')}>TABLETS</li>
          <li onClick={() => navigate('/accessories')}>ACCESSORIES</li>
        </ul>

        <div className='ret'></div>
        <div className='ret'></div>
        <div className='ret'></div>
        <div className='ret'></div>

        <div className='nav__button'>
          <Link to='/favourites'>
            <img className='nav__button--first' src="./img/Favourites_nav.svg" alt="Favourites" />
          </Link>

          <Link to='/cart'>
            <img className='nav__button--second' src="./img/Cart_nav.svg" alt="Cart" />
          </Link>
        </div>
      </div>
    </header>
  );
};
