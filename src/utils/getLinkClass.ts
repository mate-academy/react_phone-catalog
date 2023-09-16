import classNames from 'classnames';

export const getLinkClass = (
  { isActive }: { isActive: boolean },
  mainClass: string,
  activeClass: string,
) => classNames(mainClass, {
  [activeClass]: isActive,
});
