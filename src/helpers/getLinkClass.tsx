import classNames from 'classnames';

export const getLinkLogoClass = (
  { isActive }: { isActive: boolean },
) => classNames(
  'header__right-side__icon--logo--link', {
    'header__right-side__icon--logo--link--active': isActive,
  },
);

export const getLinkClass = (
  { isActive }: { isActive: boolean },
) => classNames(
  'upperCase header__left-side__navigation--item--link', {
    'header__left-side__navigation--item--link--active': isActive,
  },
);

export const getLinkLogoMenuClass = (
  { isActive }: { isActive: boolean },
) => classNames(
  'pageMenu__bottom__icon--logo--link', {
    'pageMenu__bottom__icon--logo--link--active': isActive,
  },
);

export const getLinkMenuClass = (
  { isActive }: { isActive: boolean },
) => classNames(
  'upperCase pageMenu__content__navigation--list--item--link', {
    'pageMenu__content__navigation--item--link--active': isActive,
  },
);
