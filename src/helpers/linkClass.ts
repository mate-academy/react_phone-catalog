import cn from 'classnames';

export const linkClass = {
  nav: ({ isActive }: { isActive: boolean }) => cn(
    'nav__link', { 'nav__link--active': isActive },
  ),
  icon: ({ isActive }: { isActive: boolean }) => cn(
    'header__icon', { 'header__icon--active': isActive },
  ),
  fav: ({ isActive }: { isActive: boolean }) => cn(
    'header__icon header__icon--fav', { 'header__icon--active': isActive },
  ),
  footer: ({ isActive }: { isActive: boolean }) => cn(
    'footer__link', { 'footer__link--active': isActive },
  ),
};
