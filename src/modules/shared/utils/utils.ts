import classNames from 'classnames';

export const getLinkClass = (
  isActive: boolean,
  baseClass: string,
  activeClass: string,
) => classNames(baseClass, { [activeClass]: isActive });
