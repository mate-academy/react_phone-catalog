export function getPageData(
  limit: number, productsCount: number, page: number, maxPageCount: number,
) {
  if (limit === 0) {
    return [];
  }

  const pageCount = Math.ceil(productsCount / limit);
  const pageData = [];

  for (let i = 0; i < pageCount; i += 1) {
    pageData.push(i + 1);
  }

  const pageStart = page < maxPageCount
    ? 0
    : Math.floor(page - (maxPageCount / 2));
  const pageEnd = pageStart + maxPageCount;

  return pageData.slice(pageStart, pageEnd);
}
