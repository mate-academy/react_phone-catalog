import { ProductListItem, Category, ProductDetailBase } from './types';

async function fetchCategory(type: Category): Promise<ProductDetailBase[]> {
  const map: Record<Category, string> = {
    phones: 'api/phones.json',
    tablets: 'api/tablets.json',
    accessories: 'api/accessories.json',
  };

  const response = await fetch(map[type]);

  if (!response.ok) {
    throw new Error(`Failed to load ${type}`);
  }

  return response.json();
}

export async function getCategoryItems(
  type: Category,
): Promise<ProductListItem[]> {
  const details = await fetchCategory(type);

  return details.map(d => ({
    id: Math.random(),
    category: type,
    itemId: d.id,
    name: d.name,
    fullPrice: d.priceRegular,
    price: d.priceDiscount,
    screen: d.screen ?? '',
    capacity: d.capacity ?? '',
    color: d.color ?? '',
    ram: d.ram ?? '',
    year: d.year ?? 0,
    image: d.images?.[0] ?? '',
  }));
}
