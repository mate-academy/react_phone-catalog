import React from 'react';
import './MenuButton.scss';
import classNames from 'classnames';

type Props = {
  hasMenu: boolean;
  setHesMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuButton: React.FC<Props> = ({ hasMenu, setHesMenu }) => {
  const onClick = () => {
    setHesMenu(prev => !prev);
  };

  return (
    <button
      className={classNames('menu-button', { 'menu-button--active': hasMenu })}
      type="button"
      onClick={onClick}
    >
      Menu button
      <div
        className={classNames('menu-button__line-t', {
          'menu-button__line-t--active': hasMenu,
        })}
      />
      <div
        className={classNames('menu-button__line-m-1', {
          'menu-button__line-m-1--active': hasMenu,
        })}
      />
      <div
        className={classNames('menu-button__line-m-2', {
          'menu-button__line-m-2--active': hasMenu,
        })}
      />
      <div
        className={classNames('menu-button__line-b', {
          'menu-button__line-b--active': hasMenu,
        })}
      />
    </button>
  );
};
