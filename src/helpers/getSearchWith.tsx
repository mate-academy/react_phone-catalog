export function getSearchWith(
  searchParams: URLSearchParams,
  params: { [key: string]: string },
): string {
  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      searchParams.delete(key);
    } else if (Array.isArray(value)) {
      searchParams.delete(key);

      value.forEach(part => {
        searchParams.append(key, part);
      });
    } else {
      searchParams.set(key, value);
    }
  });

  return searchParams.toString();
}
