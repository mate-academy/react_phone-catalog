export function getPageNumbers(
  totalItems: number,
  itemsPerPage: number,
  activePage: number,
): { id: string, name: '...' | number }[] {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers: { id: string, name: '...' | number }[] = [];

  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push({ id: `${i}`, name: i });
  }

  if (pageNumbers.length <= 5) {
    return pageNumbers;
  }

  if (activePage <= 3) {
    pageNumbers.splice(5, pageNumbers.length - 6, { id: 'end', name: '...' });

    return pageNumbers;
  }

  if (activePage >= pageNumbers.length - 2) {
    pageNumbers.splice(1, pageNumbers.length - 6, { id: 'start', name: '...' });

    return pageNumbers;
  }

  pageNumbers
    .splice(
      activePage + 2,
      pageNumbers.length - (activePage + 3),
      { id: 'end', name: '...' },
    );

  pageNumbers
    .splice(1, activePage - 4, { id: 'start', name: '...' });

  return pageNumbers;
}
