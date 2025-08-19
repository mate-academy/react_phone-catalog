export function getSubtitleText(count: number, emptyText: string) {
  if (count === 0) {
    return emptyText;
  }

  if (count === 1) {
    return '1 item';
  }

  return `${count} items`;
}
