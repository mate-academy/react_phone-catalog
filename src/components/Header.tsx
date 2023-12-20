import classNames from 'classnames';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { useMyContext } from '../context/context';
import { PageTyphe } from '../helpers/Types';

export const Header = () => {
  const { favourites, cart } = useMyContext();
  const location = useLocation().pathname.slice(1);
  const [query, setQuery] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const getNavLinkActive = (baseClass: string) => (
    { isActive }: { isActive: boolean },
  ) => {
    return classNames(baseClass, { 'navbar__link--item-active': isActive });
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setQuery(inputValue);

    if (inputValue) {
      searchParams.set('query', inputValue);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  };

  const handleCleanQuery = () => {
    setQuery('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    setQuery('');
    searchParams.delete('query');
    setSearchParams(searchParams);
  }, [location]);

  return (
    <header>
      <div className="navbar__left">
        <NavLink
          to="/"
          className="navbar__logo"
        >
          <img alt="log" src="./img/logo.svg" />
        </NavLink>
        <nav className="navbar__link">
          <NavLink
            to="/"
            className={getNavLinkActive('navbar__link--item SmallText')}
          >
            home
          </NavLink>

          <NavLink
            to="/phones"
            className={getNavLinkActive('navbar__link--item SmallText')}
          >
            phones
          </NavLink>

          <NavLink
            to="/tablets"
            className={getNavLinkActive('navbar__link--item SmallText')}
          >
            tablets
          </NavLink>

          <NavLink
            to="/accessories"
            className={getNavLinkActive('navbar__link--item SmallText')}
          >
            accessories
          </NavLink>
        </nav>
      </div>
      <div className="navbar__right">

        { (location === PageTyphe.Phones
        || location === PageTyphe.Tablets
        || location === PageTyphe.Accessories
        || location === PageTyphe.Favorites)
         && (
           <div className="navbar__search">
             <input
               type="text"
               className="navbar__search--input"
               placeholder={`Search in ${location}...`}
               value={query}
               onChange={handleInput}
             />
             {query && query.length > 0
               ? (
                 <button
                   className="navbar__search--input-item-clear"
                   onClick={handleCleanQuery}
                   aria-label="clear"
                   type="button"
                   data-cy="searchDelete"
                 />
               )
               : (<div className="navbar__search--input-item-loop" />)}

           </div>
         )}
        <NavLink
          to="/favorites"
          className={getNavLinkActive('navbar__favourites navbar__link--item')}
        >
          <img
            alt="favorites"
            src="./img/favourites.svg"
            className="navbar__favourites--image"
          />
          {favourites.length > 0 && (
            <span className="navbar__favourites--image-counter">
              {favourites.length}
            </span>
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={getNavLinkActive('navbar__cart navbar__link--item')}
        >
          <img
            alt="cart"
            src="./img/cart.svg"
            className="navbar__favourites--image"
          />
          {cart.length > 0 && (
            <span className="navbar__favourites--image-counter">
              {cart.length}
            </span>
          )}
        </NavLink>
      </div>
    </header>
  );
};
