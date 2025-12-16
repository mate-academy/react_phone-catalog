import { NormalizedProduct } from '../types/NormalizedProduct';

export function normalizeProduct(raw): NormalizedProduct {
  return {
    id: raw.itemId ?? raw.id, // головне → УНІФІКУВАТИ ID
    name: raw.name,
    namespaceId: raw.namespaceId,

    price: raw.price ?? raw.priceDiscount ?? raw.priceRegular,
    fullPrice: raw.fullPrice ?? raw.priceRegular ?? raw.price,

    capacity: raw.capacity,
    capacityAvailable: raw.capacityAvailable ?? [raw.capacity],

    color: raw.color,
    colorsAvailable: raw.colorsAvailable ?? [raw.color],

    images: raw.images ?? [raw.image],

    screen: raw.screen,
    ram: raw.ram,
    year: raw.year,

    description: raw.description ?? [],
    cell: raw.cell ?? [],

    category: raw.category,
  };
}
