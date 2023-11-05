export function normalizePath(path: string) {
  const parts = path.split('-').join(' ').split(' ');

  const partsUpper = parts.map(
    part => part.slice(0, 1).toUpperCase() + part.slice(1),
  );

  return partsUpper.join(' ');
}
