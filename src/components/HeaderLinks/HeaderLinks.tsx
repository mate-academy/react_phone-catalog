import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';

import style from './HeaderLinks.module.scss';
import { MenuItems } from '../../types/MenuItems';
import { DispatchContext, StateContext } from '../GlobalProvider';

export const HeaderLinks: React.FC = () => {
  const { showMenu } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <div
      className={classNames(style.container, {
        [style.container_isMobileMenu]: showMenu,
      })}
    >
      {['home', ...Object.values(MenuItems)].map(item => {
        return (
          <NavLink
            key={item}
            to={item === 'home' ? '/' : `/${item}`}
            className={({ isActive }) =>
              classNames(style.link, {
                isActive_link: isActive,
                [style.link_isMobileMenu]: showMenu,
              })
            }
            onClick={() => dispatch({ type: 'setShowMenu', payload: false })}
          >
            {item}
          </NavLink>
        );
      })}
    </div>
  );
};
