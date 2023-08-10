export const getGridColumn = (index: number) => {
  const itemsInRow = 4;
  const rowIndex = index % itemsInRow;
  const start = rowIndex * 6 + 1;
  const end = rowIndex * 6 + 6;

  return `${start}-${end}`;
};
