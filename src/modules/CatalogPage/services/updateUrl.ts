export const updateURLParams = (
  newSortBy: string,
  newPerPage: string,
  newPage: number,
) => {
  const queryParams = new URLSearchParams(location.search);

  if (newPage && newPage !== 1) {
    queryParams.set('page', newPage.toString());
  }

  if (newSortBy) {
    queryParams.set('sort', newSortBy);
  }

  if (newPerPage && newPerPage !== 'all') {
    queryParams.set('perPage', newPerPage);
  }

  return `?${queryParams.toString()}`;
};
