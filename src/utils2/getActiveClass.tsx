type ClassName = {
  isActive: boolean;
};

export const getActiveClass = (
  baseClass: string,
  activeClass: string = 'active',
) => {
  return ({ isActive }: ClassName) =>
    `${baseClass}${isActive ? ` ${activeClass}` : ''}`;
};
