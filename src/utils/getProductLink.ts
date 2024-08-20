export const getProductLink = (
  cat: string | undefined,
  id: string | undefined,
  newColor: string | undefined,
  newCapacity: string | undefined,
) => {
  const fixColor =
    newColor && newColor?.split(' ').length >= 2
      ? newColor?.split(' ').join('-')
      : newColor;

  return (
    cat &&
    id &&
    newColor &&
    newCapacity &&
    `/${cat}/${id}-${newCapacity.toLowerCase()}-${fixColor}`
  );
};
