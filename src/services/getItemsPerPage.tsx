export function getItemsPerPage(option: string, length: number) {
  if (option !== 'All') {
    switch (option) {
      case '4':
        return 4;

      case '8':
        return 8;

      case '16':
        return 16;

      default:
        return 0;
    }
  }

  return length;
}
