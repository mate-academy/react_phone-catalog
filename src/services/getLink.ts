export const getLink = (
  namespaceId: string,
  capacity: string,
  color: string,
) => {
  const result = [...namespaceId.split('-')];

  return [...result, capacity.toLowerCase(), color].join('-');
};
