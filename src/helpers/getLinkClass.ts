import classNames from 'classnames';

export const getLinkClass = (isActive: boolean, className: string) =>
  classNames(`${className}`, {
    active: isActive,
  });
