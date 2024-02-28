/* eslint-disable react/require-default-props */
import React from 'react';
import cn from 'classnames';
import { HeaderLink } from '../HeaderLink';

import './MenuNav.scss';

type Props = {
  menuItems: string[];
  block?: string;
  isOpened?: boolean;
};

export const MenuNav: React.FC<Props> = ({ menuItems, block, isOpened }) => {
  return (
    <nav
      className={cn('menu', `${block ? `${block}__menu` : ''}`, {
        opened: isOpened,
      })}
    >
      <ul className={`menu__list ${block}__list`}>
        {menuItems.map(item => (
          <li
            key={item}
            className={`menu__item ${block ? `${block}__item` : ''}`}
          >
            <HeaderLink
              to={item === 'home' ? '/' : item}
              className={`menu__link ${block ? `${block}__link` : ''}`}
            >
              <span>{item}</span>
            </HeaderLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
