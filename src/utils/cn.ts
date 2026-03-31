import classNames from 'classnames';

export const cn = (...classes: Parameters<typeof classNames>) => {
  return classNames(...classes).trim();
};
