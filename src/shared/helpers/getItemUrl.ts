export const getItemUrl = (
  namespaceId: string,
  capacity: string,
  color: string,
) => `/item/${namespaceId}-${capacity}-${color}`;
