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
    basketPhones,
  } = useHeaderContext();

  const searhInput = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <header className="header">
      <nav className="header__content-left">
        <a className="header-logo" href="/">
          <img src="./img/icons/Logo.svg" alt="logo" />
        </a>

        <Link className="header__content-left-link" to="/home">home</Link>
        <Link className="header__content-left-link" to="/phones">phones</Link>
        <a className="header__content-left-link" href="/">tablets</a>
        <a className="header__content-left-link" href="/">accessories</a>
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
          {basketPhones.length > 0 && (
            <div
              className="circle"
            >
              { basketPhones.length}
            </div>
          )}
          <img className="image" src="./img/icons/Group.svg" alt="basket" />
        </Link>
      </nav>
    </header>
  );
};
