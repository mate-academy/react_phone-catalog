export function handleMove(direction: string, margin: number, itemWidth: number) {
  let marginNew = 0;

  if (direction === 'back') {
    marginNew = margin + itemWidth;
  } else if (direction === 'forward') {
    marginNew = margin - itemWidth;
  } else if (direction === 'forward-slider') {
    marginNew = margin - itemWidth;
  } else if (direction === 'back-slider') {
    marginNew = margin + itemWidth;
  }

  return marginNew;
}
