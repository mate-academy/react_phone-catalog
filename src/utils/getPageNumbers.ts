export function getPageNumbers(from: number, to: number) {
  const pages = [];

  for (let page = from; page <= to; page++) {
    pages.push(page);
  }

  return pages;
}
