export function getPageRange(
  current: number,
  total: number,
  maxButtons: number,
): number[] {
  const half = Math.floor(maxButtons / 2);
  let start = Math.max(current - half, 1);
  const end = Math.min(start + maxButtons - 1, total);

  if (end - start < maxButtons - 1) {
    start = Math.max(end - maxButtons + 1, 1);
  }

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}
