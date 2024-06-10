import classNames from 'classnames';

export const classNameFunc = (
  { isActive }: { isActive: boolean },
  baseClass: string,
  isFooter: boolean,
) => {
  if (isFooter) {
    return classNames(baseClass, `${baseClass}--footer`);
  }

  return classNames(baseClass, { [`${baseClass}--active`]: isActive });
};
