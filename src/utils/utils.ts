import classNames from 'classnames';

export const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('nav__link', {
    active: isActive,
  });

export const scrollToTop = () => window.scrollTo(0, 0);
