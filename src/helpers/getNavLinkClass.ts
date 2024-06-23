import classNames from 'classnames';

export function getLinkClass({ isActive }: { isActive: boolean }) {
  return classNames('nav__link', {
    'nav__link--isActive': isActive,
  });
}
