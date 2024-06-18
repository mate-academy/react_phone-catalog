import './Header.scss';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import React from 'react';

type Props = {
  menuShow: boolean;
  setMenuShown: (menuIsShown: boolean) => void;
};

export const Header: React.FC<Props> = ({ menuShow, setMenuShown }) => (
  <header className="header" id="header">
    <Logo placement={'header'} />

    <div className="header__navigation">
      <Navigation />
    </div>

    <div className="header__buttons">
      {menuShow ? (
        <button
          className="header__button header__button--close"
          onClick={() => setMenuShown(false)}
        />
      ) : (
        <button
          className="header__button header__button--menu"
          onClick={() => setMenuShown(true)}
        />
      )}
    </div>
  </header>
);
