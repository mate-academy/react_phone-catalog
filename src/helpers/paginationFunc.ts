export function getPages(start: number, end: number) {
  const pages = [];

  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  return pages;
}
