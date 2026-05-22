export const getBaseModelId = (id: string) => {
  if (!id) {
    return '';
  }

  const parts = id.split('-');

  return parts.slice(0, -2).join('-');
};
