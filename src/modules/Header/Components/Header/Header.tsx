import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { NavIcons } from '../NavigationIcons/NavIcons';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import classNames from 'classnames';
// eslint-disable-next-line max-len
import { setIsOpened } from '../../../../app/features/asideMenuSlice';
import { DarkModeContext } from '../../../../Store/StoreThemeMode';

export const Header: React.FC = () => {
  const asideMenu = useAppSelector(state => state.asideReducer);
  const dispatch = useAppDispatch();
  const { isDark } = useContext(DarkModeContext);

  return (
    <header
      className={classNames('header', {
        'header--is-Dark': isDark,
      })}
    >
      <div className="header__start">
        <Link
          className={classNames('header__logo', {
            'header__logo--is-Dark': isDark,
          })}
          to={'/'}
        />

        <div className="header__nav">
          <Navigation />
        </div>
      </div>

      <div className="header__nav">
        <NavIcons />
      </div>

      <button
        type="button"
        className={classNames('header__burger-menu', {
          'header__burger-menu--active': asideMenu,
          'header__burger-menu--is-Dark': isDark,
          'header__burger-menu--is-Dark-Active': isDark && asideMenu,
        })}
        onClick={() => {
          dispatch(setIsOpened(asideMenu ? false : true));
        }}
      />
    </header>
  );
};
