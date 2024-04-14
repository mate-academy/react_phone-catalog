import cn from 'classnames';

export const getLinkLogoClass = ({ isActive }: { isActive: boolean }) =>
  cn('header__right-side__icon--logo--link', {
    'header__right-side__icon--logo--link--active': isActive,
  });

export const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('upperCase header__left-side__navigation--item--link', {
    'header__left-side__navigation--item--link--active': isActive,
  });

export const getLinkLogoMenuClass = ({ isActive }: { isActive: boolean }) =>
  cn('pageMenu__bottom__icon--logo--link', {
    'pageMenu__bottom__icon--logo--link--active': isActive,
  });

export const getLinkMenuClass = ({ isActive }: { isActive: boolean }) =>
  cn('upperCase pageMenu__navigation--item--link', {
    'pageMenu__navigation--item--link--active': isActive,
  });
