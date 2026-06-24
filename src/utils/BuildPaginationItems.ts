export function buildPaginationItems(totalPages: number, currentPage: number, maxButtons = 5) {
  const blockIndex = Math.floor((currentPage - 1) / maxButtons);

  const start = blockIndex * maxButtons + 1;
  const end = Math.min(totalPages, start + maxButtons - 1);

  const items = [];
  if (start > 1) {
    items.push(1);
    items.push({ type: 'left-ellipsis', to: start - 1 });
  }
  for (let i = start; i <= end; i++) items.push(i);
  if (end < totalPages) {
    items.push({ type: 'right-ellipsis', to: end + 1 });
    items.push(totalPages);
  }
  return items;
}
