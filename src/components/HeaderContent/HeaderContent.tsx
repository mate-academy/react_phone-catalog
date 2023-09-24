import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHeaderContext } from '../../provider/HeaderContext';

export const HeaderContent = () => {
  const location = useLocation();
  const isPhoneTab = location.pathname === '/phones';
  const {
    inputValue,
    handleSearch,
    favoritePhones,
    basketItems,
  } = useHeaderContext();

  const totalItemCount = basketItems
    .reduce((total, item) => total + item.count, 0);

  const searhInput = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <header className="header">
      <nav id="top" className="header__content-left">
        <Link className="header-logo" to="/">
          <img src="./img/icons/Logo.svg" alt="logo" />
        </Link>

        <Link className="header__content-left-link" to="/home">home</Link>
        <Link className="header__content-left-link" to="/phones">phones</Link>
        <Link
          className="header__content-left-link"
          to="/tablets"
        >
          tablets
        </Link>
        <Link
          className="header__content-left-link"
          to="/accessoiries"
        >
          accessories
        </Link>
      </nav>

      <nav className="header__content-right">
        {isPhoneTab && (
          <form onSubmit={searhInput} className="searh-input">
            <input
              className="searh-input-text"
              type="text"
              placeholder="Search in phones..."
              value={inputValue}
              onChange={handleSearch}
            />
            <img
              className="searh-input-image"
              src="./img/icons/Search.svg"
              alt="find"
            />
          </form>
        )}
        <Link
          to="/favorits"
          className="favorits"
        >
          {favoritePhones.length > 0 && (
            <div
              className="circle"
            >
              { favoritePhones.length}
            </div>
          )}
          <img className="image" src="./img/icons/Heart.svg" alt="like" />
        </Link>
        <Link
          to="/basket"
          className="basket"
        >
          {basketItems.length > 0 && (
            <div
              className="circle"
            >
              {totalItemCount}
            </div>
          )}
          <img className="image" src="./img/icons/Group.svg" alt="basket" />
        </Link>
      </nav>
      <div className="header__content-menu">
        <Link to="/menu" className="navigation">
          <img className="image" src="./img/icons/menu.svg" alt="menu" />
        </Link>
      </div>
    </header>
  );
};
