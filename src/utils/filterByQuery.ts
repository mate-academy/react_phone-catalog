export const filterByQuery = <T>(
  products: T[],
  query: string | null,
  getSearchableText: (item: T) => string,
) => {
  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return products;
  }

  const searchTokens = normalizedQuery.split(/\s+/);

  return products.filter(p => {
    const searchableText = getSearchableText(p).toLowerCase();

    return searchTokens.every(token => searchableText.includes(token));
  });
};
