export const capitalizeString = (word: string) => {
  return `${word?.at(0)?.toUpperCase()}${word?.slice(1)}`;
};

export const changeProductId = (
  productId: string,
  position: -1 | -2,
  newEl: string,
) => {
  const splittedProductId = productId.split('-');

  splittedProductId.splice(position, 1, newEl);

  return splittedProductId.join('-').toLocaleLowerCase();
};

export const getClassNameForNavLink
  = (className: string, modifier?: string) =>
    ({ isActive }: { isActive: boolean }) =>
      `${className}${modifier || ''} ${isActive ? `${className}--active` : ''}`;
