import classnames from 'classnames';

export const getHeaderNavLinkClass = ({
  isActive,
}: { isActive: boolean }) => classnames(
  'upperCase header__left-side__navigation--item--link', {
    'header__left-side__navigation--item--link--active': isActive,
  },
);

export const getHeaderLinkIconClass = ({
  isActive,
}: { isActive: boolean }) => classnames(
  'header__right-side__icon--logo--link', {
    'header__right-side__icon--logo--link--active': isActive,
  },
);
