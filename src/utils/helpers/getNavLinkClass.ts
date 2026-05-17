import classNames from 'classnames';

export const getNavLinkClass = (
  isActive: boolean,
  activeClass: string,
  defaultClass: string,
) => classNames(isActive ? activeClass : defaultClass);
