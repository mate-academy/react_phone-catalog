type Params = {
  pageParam: string | null;
  perPageParam: string | null;
  totalItems: number;
  allowedPageSizes: readonly string[];
};

export const resolveCatalogPagination = ({
  pageParam,
  perPageParam,
  totalItems,
  allowedPageSizes,
}: Params) => {
  const itemsPerPage = Number(
    allowedPageSizes.includes(perPageParam ?? '') ? perPageParam : (
      allowedPageSizes[0]
    ),
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const requestedPage = Number(pageParam);
  const currentPage =
    (
      pageParam &&
      /^[1-9]\d*$/.test(pageParam) &&
      Number.isSafeInteger(requestedPage)
    ) ?
      Math.min(requestedPage, Math.max(1, totalPages))
    : 1;

  return {
    itemsPerPage,
    currentPage,
    totalPages,
    startIndex: (currentPage - 1) * itemsPerPage,
  };
};
