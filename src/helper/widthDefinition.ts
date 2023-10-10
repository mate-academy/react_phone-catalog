export const widthDefinition = (width: number) => {
  let result = 4;

  if (width > 767 && width < 1279) {
    result = 2;
  } else if (width < 768) {
    result = 1;
  }

  return result;
};
