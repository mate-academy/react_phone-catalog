import classNames from 'classnames';

export const getLinkClass = ({ isActive }: { isActive: boolean; }) => (
  classNames('navbar-link__link', {
    'navbar-link__link--active': isActive,
  }));
