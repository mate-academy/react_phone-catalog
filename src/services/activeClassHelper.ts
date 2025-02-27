import classNames from 'classnames';

export const getActiveClass = (baseClass: string) => {
  return ({ isActive }: { isActive: boolean }) => {
    return classNames(baseClass, {
      [`${baseClass}--is-active`]: isActive,
    });
  };
};
