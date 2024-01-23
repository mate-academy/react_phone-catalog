import cn from 'classnames';

export const getActiveClassName
= (baseClassName: string, isActive: boolean, extraClassNames?: string[]) => {
  return cn(baseClassName, {
    [`${baseClassName}`]: true,
    [`${baseClassName}--active`]: isActive,
    ...extraClassNames,
  });
};
