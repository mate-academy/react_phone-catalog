import React, { useContext } from 'react';
import './MenuButton.scss';
import classNames from 'classnames';
import { MenuContext } from '../../helpers/utils/menuContext';

type Props = {};

export const MenuButton: React.FC<Props> = () => {
  const { hasMenu, setHasMenu } = useContext(MenuContext);

  const onClick = () => {
    setHasMenu(prev => !prev);
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
