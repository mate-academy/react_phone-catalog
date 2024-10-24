import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import style from './FavCarIcons.module.scss';
import { DispatchContext, StateContext } from '../GlobalProvider';

type Props = { mobileView?: boolean };
export const FavCarIcons: React.FC<Props> = ({ mobileView = false }) => {
  const dispatch = useContext(DispatchContext);
  const { inDarkMode } = useContext(StateContext);

  return (
    <div className={style.container}>
      <div
        className={classNames(style.container_icon, style.container_icon_link, {
          [style.mobile_menu]: mobileView,
        })}
      >
        <div
          className={classNames(
            style.icon_container,
            style.icon_container_dark,
            {
              [style.mobile_menu]: mobileView,
            },
          )}
          onClick={() => {
            dispatch({ type: 'setInDarkMode', payload: !inDarkMode });
            document.body.classList.toggle('theme_dark');
          }}
        >
          <div className={classNames(style.icon, style.icon_dark)} />
        </div>

        <NavLink
          to={'/favorite'}
          className={({ isActive }) =>
            classNames(style.icon_container, style.icon_container_favorite, {
              isActive_link: isActive,
              [style.mobile_menu]: mobileView,
            })
          }
          onClick={() => dispatch({ type: 'setShowMenu', payload: false })}
        >
          <div className={classNames(style.icon, style.icon_favorite)} />
        </NavLink>

        <NavLink
          to={'/cart'}
          className={({ isActive }) =>
            classNames(style.icon_container, style.icon_container_cart, {
              isActive_link: isActive,
              [style.mobile_menu]: mobileView,
            })
          }
          onClick={() => dispatch({ type: 'setShowMenu', payload: false })}
        >
          <div className={classNames(style.icon, style.icon_cart)} />
        </NavLink>
      </div>
    </div>
  );
};
