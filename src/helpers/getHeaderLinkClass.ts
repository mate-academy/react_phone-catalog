import classNames from 'classnames';

export function getLinkClass({ isActive }: { isActive: boolean }) {
  return classNames('header__icon', {
    'header__icon--isActive': isActive,
  });
}
