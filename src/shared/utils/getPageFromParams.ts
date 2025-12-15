export const getPageFromParams = (params: URLSearchParams): number => {
  const pageFromParams = Number(params.get('page') || '1');

  if (Number.isNaN(pageFromParams) || pageFromParams < 1) {
    return 1;
  }

  return pageFromParams;
};
