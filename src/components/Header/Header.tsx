import React, { useContext } from 'react';
import classNames from 'classnames';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { Logo } from '../Logo';
import { getSearchWith } from '../../utils/searchHelper';
import { PhoneContext } from '../../utils/PhoneContext';

export const Header: React.FC = () => {
  const pages = [
    { title: 'Home', link: '/' },
    { title: 'Phones', link: '/phones' },
    { title: 'Tablets', link: '/tablets' },
    { title: 'Accessories', link: '/accessories' },
  ];

  const location = useLocation();
  const boolean = location.pathname === '/phones'
    || location.pathname === '/tablets';

  const [searchParams, setSearchParams] = useSearchParams() || '';

  const inputValue = searchParams.get('query');

  const changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const { favPhones, bagPhones } = useContext(PhoneContext);

  return (
    <div className="header" id="header">
      <Logo />
      <div className="header_links">
        <div className="header_links_to_page">
          {pages.map(page => (
            <NavLink
              to={page.link}
              key={page.title}
              className={({ isActive }) => classNames(
                'header_links_to_page_link', {
                  'header_links_to_page_link-active': isActive,
                },
              )}
            >
              {page.title}
            </NavLink>
          ))}
        </div>
        <div className="header_links_to_buy">
          {boolean && (
            <input
              type="search"
              placeholder="Search in phones..."
              className="header_links_to_buy_input"
              value={inputValue || ''}
              onChange={changeQuery}
            />
          )}
          <NavLink
            to="favorite"
            className={({ isActive }) => classNames(
              'header_links_to_buy_link favorite', {
                'header_links_to_buy_link-active': isActive,
              },
            )}
          >
            <div
              className="header_links_to_buy_link_icon"
            >
              {Boolean(favPhones.length) && (
                <div className="header_links_to_buy_link_icon_count">
                  {favPhones.length}
                </div>
              )}
            </div>
          </NavLink>
          <NavLink
            className={({ isActive }) => classNames(
              'header_links_to_buy_link bag', {
                'header_links_to_buy_link-active': isActive,
              },
            )}
            to="bag"
          >
            <div
              className="header_links_to_buy_link_icon"
            >
              {Boolean(bagPhones.length) && (
                <div className="header_links_to_buy_link_icon_count">
                  {bagPhones.length}
                </div>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
