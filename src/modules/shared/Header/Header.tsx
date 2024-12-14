import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  const location = useLocation();
  const [searchText, setSearchText] = useState(''); // Состояние для текста в input

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value); // Обновляем состояние
  };

  const clearInput = () => {
    setSearchText(''); // Очищаем текст
  };

  return (
    <div className="header">
      <a href="#">
        <img src="logo.svg" alt="Nice Gadgets" className="header__logo" />
      </a>

      <div className="header__menu">
        <ul className="header__list">
          <li className="header__nav-item">
            <NavLink className="header__nav-link" to="/">
              home
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink className="header__nav-link" to="phones">
              Phones
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink className="header__nav-link" to="tablets">
              tablets
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink className="header__nav-link" to="accessories">
              accessories
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="header__buttons-right">
        {location.pathname !== '/' && (
          <div className="header__search-wrapper">
            <input
              type="text"
              placeholder="Search product..."
              className="header__search-input"
              value={searchText}
              onChange={handleInputChange} // Обработка ввода
            />
            {searchText && (
              <button
                className="header__clear-button"
                onClick={clearInput} // Обработка клика на крестик
              >
                ×
              </button>
            )}
          </div>
        )}
        <NavLink to="#" className="header__icon header__icon--menu"></NavLink>
        <NavLink
          to="cart"
          className="header__icon header__icon--shoping_bag"
        ></NavLink>
        <NavLink
          to="favorites"
          className="header__icon header__icon--favourite"
        ></NavLink>
      </div>
    </div>
  );
};
