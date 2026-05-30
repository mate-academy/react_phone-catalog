import classNames from 'classnames';

type GetClassNameParams = {
  isActive: boolean;
  baseClass: string;
  activeClass: string;
};

export const getClassName = ({
  isActive,
  baseClass,
  activeClass,
}: GetClassNameParams) => {
  return classNames(baseClass, {
    [activeClass]: isActive,
  });
};
