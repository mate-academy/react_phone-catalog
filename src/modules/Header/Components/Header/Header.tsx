import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import { NavIcons } from '../NavigationIcons/NavIcons';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import classNames from 'classnames';
// eslint-disable-next-line max-len
import { setIsOpened } from '../../../../app/features/asideMenuSlice';

export const Header: React.FC = () => {
  const asideMenu = useAppSelector(state => state.asideReducer);
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="header__start">
        <Link className="header__logo" to={'/'} />

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
        })}
        onClick={() => {
          dispatch(setIsOpened(asideMenu ? false : true));
        }}
      />
    </header>
  );
};
