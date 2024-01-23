import cn from 'classnames';

export const getActiveClassName = (
  baseClassName: string,
  isActive: boolean,
  extraClassNames?: string[],
) => {
  return cn(...(extraClassNames || []), {
    [`${baseClassName}`]: true,
    [`${baseClassName}--active`]: isActive,
  });
};
