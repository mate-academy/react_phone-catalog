import cn from 'classnames';

export const getLinkClass = ({
  isActive,
}: { isActive: boolean }) => cn('nav__link', {
  'nav__link--is-active': isActive,
});

export const getLinkIcon = ({
  isActive,
}: { isActive: boolean }) => cn({
  'header__img-contain--is-active': isActive,
});
