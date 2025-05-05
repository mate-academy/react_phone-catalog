export const getPageNumber = (page: number): number[] => {
  const pages: number[] = [];

  for (let i = 1; i <= page; i++) {
    pages.push(i);
  }

  return pages;
};
