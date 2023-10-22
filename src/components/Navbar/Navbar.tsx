import { NavLink, useSearchParams } from 'react-router-dom';
import {
  useContext,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import './Navbar.scss';
import logo from '../../images/Logo.svg';
import { NavbarContext } from '../../context/NavbarContext';

export const Navbar = () => {
  const generateClassesForLinks = ({
    isActive,
  }: { isActive: boolean }) => cn('nav__link', { 'is-active': isActive });

  const [amountLiked, setAmountLiked] = useState(0);
  const [amountAdded, setAmountAdded] = useState(0);
  const { likedDevices, addedDevices } = useContext(NavbarContext);
  const { query, handleQChange, device } = useContext(NavbarContext);

  useEffect(() => {
    setAmountLiked(Object.keys(localStorage)
      .filter(it => it === 'liked').length);
  }, [likedDevices.length]);

  useEffect(() => {
    setAmountAdded(Object.keys(localStorage)
      .filter(it => it === 'added').length);
  }, [addedDevices.length]);

  const [searchParams] = useSearchParams();

  return (
    <div className="header__wrapper">
      <div className="links-wrapper">
        <NavLink
          to={{
            pathname: '/',
            search: searchParams.toString(),
          }}
          className="main-logo"
        >
          <img src={logo} alt="Logo" className="logo__img" />
        </NavLink>
        <nav className="nav">
          <ul className="nav__list">
            <li className="nav__item">
              <NavLink
                to={{
                  pathname: '/',
                  search: searchParams.toString(),
                }}
                className={generateClassesForLinks}
              >
                Home
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                to={{
                  pathname: '/phones',
                  search: searchParams.toString(),
                }}
                className={generateClassesForLinks}
              >
                Phones
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                to={{
                  pathname: '/tablets',
                  search: searchParams.toString(),
                }}
                className={generateClassesForLinks}
              >
                Tablets
              </NavLink>
            </li>

            <li className="nav__item">
              <NavLink
                to={{
                  pathname: '/accessories',
                  search: searchParams.toString(),
                }}
                className={generateClassesForLinks}
              >
                Accessories
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="logos-wrapper">
        <div className={cn('nav__search', {
          hidden: !device,
        })}
        >
          <input
            onChange={handleQChange}
            className="nav__search-input"
            placeholder={`Search in ${device}...`}
            type="text"
            value={query}
          />
        </div>
        <div className="logo--like-wrapper">
          <NavLink to="/" className="logo logo--like">
            {amountLiked !== 0 && (
              <span className="logo--amount">{amountLiked}</span>
            )}
          </NavLink>

        </div>
        <NavLink to="/" className="logo logo--cart">
          {amountAdded !== 0 && (
            <span className="logo--amount">{amountAdded}</span>
          )}
        </NavLink>
      </div>
    </div>
  );
};
