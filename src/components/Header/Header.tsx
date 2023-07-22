import React from 'react';

import {
  HEADER_MOBILE_NAV_ITEMS,
  HEADER_DESKTOP_NAV_ITEMS,
} from '../../helpers/NavLinks';

import { NavItem } from '../NavItem/NavItem';

import './Header.scss';

export const Header: React.FC = React.memo(() => (
  <header className="header">
    <nav className="header__nav">
      <div className="container">
        <div className="grid">
          <ul
            className="header__nav-list header__nav-list--mobile"
          >
            {HEADER_MOBILE_NAV_ITEMS.map(item => (
              <NavItem
                item={item}
                key={item}
                defaultLiClass="header__nav-list-item"
                defaultLinkClass="header__nav-list-link"
                mobileClass="header__nav-list-item--mobile"
                desktopClass="header__nav-list-item--desktop"
              />
            ))}
          </ul>

          <ul
            className="header__nav-list header__nav-list--desktop"
            style={{
              gridTemplateColumns: `repeat(${HEADER_DESKTOP_NAV_ITEMS.length}, 1fr)`,
            }}
          >
            {HEADER_DESKTOP_NAV_ITEMS.map(item => (
              <NavItem
                item={item}
                key={item}
                isDesktop
                defaultLiClass="header__nav-list-item"
                defaultLinkClass="header__nav-list-link"
                mobileClass="header__nav-list-item--mobile"
                desktopClass="header__nav-list-item--desktop"
              />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  </header>
));
