export const productPathGenerator = (
  nameSpaceId: string,
  capacity: string,
  color: string,
  category: string,
) => {
  const urlCapacity = capacity.replaceAll(' ', '-').toLowerCase();
  const urlColor = color.replaceAll(' ', '-').toLowerCase();

  return `/${category}/${nameSpaceId}-${urlCapacity}-${urlColor}`;
};
