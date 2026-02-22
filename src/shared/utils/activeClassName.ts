import classNames from 'classnames';

export const getClassLink = ({
  isActive,
  baseClass,
  activeClass,
}: {
  isActive: boolean;
  baseClass: string;
  activeClass: string;
}) =>
  classNames(baseClass, {
    [activeClass]: isActive,
  });
