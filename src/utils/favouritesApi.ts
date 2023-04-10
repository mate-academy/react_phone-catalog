export const updateFavourites = (phonesId: string[], id: string) => {
  const isPresent = phonesId.includes(id);

  if (isPresent) {
    return phonesId.filter(item => item !== id);
  }

  return [
    ...phonesId,
    id,
  ];
};
