import React from 'react';
import { useLocation } from 'react-router-dom';
import { useHeaderContext } from '../../provider/HeaderContext';

export const HeaderContent = () => {
  const location = useLocation();
  const isPhoneTab = location.pathname === '/phones';
  const { inputValue, handleSearch } = useHeaderContext();

  const searhInput = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <header className="header">
      <nav className="header__content-left">
        <a className="header-logo" href="/">
          <img src="./img/icons/Logo.svg" alt="logo" />
        </a>

        <a className="header__content-left-link" href="/home">home</a>
        <a className="header__content-left-link" href="/phones">phones</a>
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
              src="./img/icons/icons/Search.svg"
              alt="find"
            />
          </form>
        )}
        <a
          href="/"
          className="favorits"
        >
          <img className="image" src="./img/icons/Heart.svg" alt="like" />
        </a>
        <a
          href="/"
          className="basket"
        >
          <img className="image" src="./img/icons/Group.svg" alt="basket" />
        </a>
      </nav>
    </header>
  );
};
