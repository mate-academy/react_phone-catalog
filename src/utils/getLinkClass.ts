import classNames from 'classnames';

export const getClassNav = ({ isActive }: { isActive: boolean }) =>
  classNames('nav', { 'nav-active': isActive });

export const getClassNavForMenu = ({ isActive }: { isActive: boolean }) =>
  classNames('nav menu__nav-text', { 'nav-active': isActive });

export const getClassIconForMenu = ({ isActive }: { isActive: boolean }) =>
  classNames('menu__icon icon', { 'icon-active': isActive });
