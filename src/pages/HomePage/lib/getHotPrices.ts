import type { Product } from '@/shared/types';

export const getHotPrices = (products: Product[]): Product[] => {
  const getBestDeals = (
    category: Product['category'],
    limit: number,
  ): Product[] => {
    const usedModels = new Set<string>();

    return products
      .filter(
        (product) =>
          product.category === category &&
          product.fullPrice > 0 &&
          product.fullPrice > product.price,
      )
      .sort(
        (a, b) =>
          (b.fullPrice - b.price) / b.fullPrice -
          (a.fullPrice - a.price) / a.fullPrice,
      )
      .filter((product) => {
        const model = product.item_id.replace(/-\d+(gb|tb|mm)-.*$/i, '');

        if (usedModels.has(model)) {
          return false;
        }

        usedModels.add(model);
        return true;
      })
      .slice(0, limit);
  };

  const phones = getBestDeals('phones', 4);
  const tablets = getBestDeals('tablets', 3);
  const accessories = getBestDeals('accessories', 3);

  return [...phones, ...tablets, ...accessories].map((product) => ({
    ...product,
    images: product.imageUrls?.length ? product.imageUrls : product.images,
  }));
};
