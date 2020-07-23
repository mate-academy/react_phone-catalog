export function handleMove (direction: string, margin: number) {
  let marginNew = 0;
  if (direction === 'back') {
    marginNew = margin + 285;
  } else if (direction === 'forward') {
    marginNew = margin - 285;
  }
  return marginNew;
}
