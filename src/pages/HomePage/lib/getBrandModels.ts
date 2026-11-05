import type { Product } from '@/shared/types';

const preferredColors = [
  'silver',
  'gold',
  'purple',
  'blue',
  'spaceblack',
  'spacegray',
  'midnight',
  'black',
  'white',
  'pink',
  'green',
  'red',
  'yellow',
];

const getModel = (product: Product) =>
  product.item_id.replace(/-\d+(gb|tb|mm)-.*$/i, '');

const getColorRank = (color: string) => {
  const index = preferredColors.indexOf(
    color.toLowerCase().replace(/[\s-]/g, ''),
  );

  return index === -1 ? preferredColors.length : index;
};

const pickProducts = (
  products: Product[],
  limit: number,
  usedColors = new Set<string>(),
): Product[] => {
  const models = new Map<string, Product[]>();

  for (const product of products) {
    const model = getModel(product);
    models.set(model, [...(models.get(model) ?? []), product]);
  }

  const sortedModels = [...models.values()].sort(
    (a, b) => b[0].year - a[0].year,
  );

  const selected: Product[] = [];

  for (const variants of sortedModels) {
    const sortedVariants = [...variants].sort(
      (a, b) =>
        Number(b.capacity === '128GB') - Number(a.capacity === '128GB') ||
        getColorRank(a.color) - getColorRank(b.color) ||
        a.id - b.id,
    );

    for (const product of sortedVariants) {
      const color = product.color.toLowerCase().replace(/[\s-]/g, '');

      if (usedColors.has(color)) {
        continue;
      }

      selected.push(product);
      usedColors.add(color);

      if (selected.length === limit) {
        return selected;
      }
    }
  }

  return selected;
};

export const getBrandNewModels = (products: Product[]): Product[] => {
  const phones = products.filter((p) => p.category === 'phones');

  const usedPhoneColors = new Set<string>();

  const proPhones = pickProducts(
    phones.filter((p) => /-pro(?:-max)?-/.test(p.item_id)),
    2,
    usedPhoneColors,
  );

  const regularPhones = pickProducts(
    phones.filter((p) => !/-pro(?:-max)?-/.test(p.item_id)),
    2,
    usedPhoneColors,
  );

  const selectedPhones = [...proPhones, ...regularPhones];

  const tablets = pickProducts(
    products.filter((p) => p.category === 'tablets'),
    3,
  );

  const accessories = pickProducts(
    products.filter((p) => p.category === 'accessories'),
    3,
  );

  const result = [...selectedPhones, ...tablets, ...accessories];

  return result.map((product) => ({
    ...product,
    images: product.imageUrls?.length ? product.imageUrls : product.images,
  }));
};
