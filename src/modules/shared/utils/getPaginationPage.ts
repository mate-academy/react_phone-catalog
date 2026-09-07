export const getPaginationPage = (
  currPage: number,
  totalPage: number,
  maxButtons: number = 5,
) => {
  const pages: (number | '...')[] = [];

  if (totalPage <= maxButtons) {
    return Array.from({ length: totalPage }, (_, i) => i + 1);
  }

  const left = Math.max(2, currPage - 1);
  const right = Math.min(totalPage - 1, currPage + 1);

  pages.push(1);

  if (left > 2) {
    pages.push('...');
  }

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPage - 1) {
    pages.push('...');
  }

  pages.push(totalPage);

  return pages;
};
