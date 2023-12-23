import classNames from 'classnames';

export const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-brand__item',
  { 'navbar-brand__item__active': isActive },
);
