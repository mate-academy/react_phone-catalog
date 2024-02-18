import cn from 'classnames';

export const getLinkActiveClass = (
  mainClass: string,
  isActive: boolean,
) => {
  return cn(mainClass, {
    [`${mainClass}--active`]: isActive,
  });
};
