import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Transition } from 'react-transition-group';

import {
  BURGER_NAV_ITEMS,
  BURGER_ITEMS,
} from '../../helpers/NavLinks';
import { NavLinks } from '../../types/NavLinks';

import { NavItem } from '../NavItem/NavItem';

import './Burger.scss';

export const Burger: React.FC = React.memo(() => {
  const { burger } = useParams();
  const [isInitialized, setIsinitialized] = useState(false);
  const burgerBody = useRef<HTMLDivElement>(null);

  return (
    <Transition
      nodeRef={burgerBody}
      timeout={300}
      in={isInitialized}
    >
      {state => (
        <nav
          className={classNames(
            'burger',
            {
              'burger--active': burger === 'burger',
              [`burger--${state}`]: state,
            },
          )}
          ref={burgerBody}
        >
          <ul className="burger__nav-list">
            <NavItem
              item={NavLinks.Burger}
              defaultLiClass="burger__nav-list-item"
              defaultLinkClass="burger__nav-list-link"
              onClick={() => setIsinitialized(true)}
            />

            {BURGER_NAV_ITEMS.map(item => (
              <NavItem
                item={item}
                key={item}
                defaultLiClass="burger__nav-list-item"
                defaultLinkClass="burger__nav-list-link"
              />
            ))}
          </ul>

          <ul className="burger__items-list">
            {BURGER_ITEMS.map(item => (
              <NavItem
                item={item}
                key={item}
                defaultLiClass="burger__items-list-item"
                defaultLinkClass="burger__items-list-link"
              />
            ))}
          </ul>
        </nav>
      )}
    </Transition>
  );
});
