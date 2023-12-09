import classNames from 'classnames';

export const getIconLinkClass = ({ isActive }:
{ isActive: boolean }) => classNames(
  'navbar__icon-link', 'navbar__icon-link-after',
  { 'navbar__icon-link--is-active': isActive },
);
