import { Phone } from '../types/phone';

export function getFilteredItem(
  items: Phone[],
  filter: string | null,
): Phone[] {
  if (!filter || !filter.length) {
    return items;
  }

  const filterLower = filter.toLowerCase();
  const filtered = [...items].filter(item => {
    const {
      name,
      price,
      fullPrice,
      screen,
      capacity,
      ram,
    } = item;

    return (
      name.toLowerCase().includes(filterLower)
      || String(price).toLowerCase().includes(filterLower)
      || String(fullPrice).toLowerCase().includes(filterLower)
      || screen.toLowerCase().includes(filterLower)
      || capacity.toLowerCase().includes(filterLower)
      || ram.toLowerCase().includes(filterLower)
    );
  });

  return filtered;
}
