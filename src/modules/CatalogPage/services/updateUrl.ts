export const updateURLParams = (
  newSortBy: string,
  newPerPage: string,
  newPage: number,
) => {
  const queryParams = new URLSearchParams(location.search);

  if (newPage) {
    queryParams.set('page', newPage.toString());
  }

  if (newSortBy) {
    queryParams.set('sortBy', newSortBy);
  }

  if (newPerPage) {
    queryParams.set('perPage', newPerPage);
  }

  return `?${queryParams.toString()}`;
};
