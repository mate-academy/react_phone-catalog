import './Header.scss';
// import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../../../helpers/Button/Button';
import { Logo } from '../../../helpers/Logo/Logo';

export const Header = ({ setVisibleIPhones, IPhones, visibleProducts }) => {
  // const { pathname } = useLocation();
  const pathname = '/';
  const navLinksList = ['home', 'phones', 'tablets', 'accessories'];
  const [searchInput, setSearchInput] = useState('');

  return (
    <header className="header">
      <div className="header__block">
        <div className="header__navigation">
          <Logo />
          <ul className="header__navigation-list">
            {
              navLinksList.map((item) => {
                return (
                  <li key={item} className="header__navigation-item">
                    <NavLink
                      to={item}
                      // activeClassName="active"
                      className="header__navigation-link"
                    >
                      {item}
                    </NavLink>
                  </li>
                );
              })
            }
          </ul>
        </div>
        <div className="header__buttons">
          {
            pathname === '/phones' && (
              <label className="products-search">
                <input
                  type="text"
                  placeholder="Search in phones..."
                  className="search-input"
                  value={searchInput}
                  onChange={(event) => {
                    setSearchInput(event.target.value);
                    setVisibleIPhones(IPhones.filter((one: any) => {
                      return (
                        one.name.toLowerCase().includes(
                          event.target.value.toLowerCase(),
                        ));
                    }));
                  }}
                />
                <img
                  src="/icons/Search.svg"
                  alt="Search"
                  className="small header-button no-border"
                />
              </label>
            )
          }
          <Button
            image="/icons/Favourites.svg"
            alt="favourites"
            link="favourites"
            className="header-button"
            spanClass="favourite-amount"
          />
          <Button
            image="/icons/Cart.svg"
            alt="cart"
            link="cart"
            className="header-button"
            spanClass="cart-amount"
          />
        </div>
      </div>
    </header>
  );
};
