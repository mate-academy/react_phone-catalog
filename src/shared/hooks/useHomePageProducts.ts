import { useState, useEffect } from 'react';
import { Product } from '../types/Product';

const MAX_DISPLAY_ITEMS = 16;
const NEW_MODEL_YEAR_THRESHOLD = 2022;

export const useHomePageProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPhones = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.BASE_URL}api/products.json`,
        );
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Servers crashed', error);
      } finally {
        setIsLoading(false);
      }
    };

    getPhones();
  }, []);

  const techOnly = products.filter(
    item =>
      (item.category === 'phones' || item.category === 'tablets') &&
      item.year >= NEW_MODEL_YEAR_THRESHOLD,
  );

  const sortedTech = [...techOnly].sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year;
    }

    return b.price - a.price;
  });

  const seenModels = new Set();
  const visuallyUniqueTech = sortedTech.filter(item => {
    const baseModel = item.itemId.split('-').slice(0, -2).join('-');
    const modelWithColor = `${baseModel}-${item.color}`;

    if (seenModels.has(modelWithColor)) {
      return false;
    }

    seenModels.add(modelWithColor);

    return true;
  });

  const finalBrandNewModels = visuallyUniqueTech.slice(0, MAX_DISPLAY_ITEMS);

  const phonesList = products.filter(product => product.category === 'phones');
  const tabletsList = products.filter(
    product => product.category === 'tablets',
  );
  const accessoriesList = products.filter(
    product => product.category === 'accessories',
  );

  const fullPriceProducts = products.filter(
    product =>
      (product.fullPrice || 0) > product.price &&
      product.year < NEW_MODEL_YEAR_THRESHOLD,
  );

  const sortedFullPrice = fullPriceProducts.sort(
    (a, b) => (b.fullPrice || 0) - b.price - ((a.fullPrice || 0) - a.price),
  );

  const seenDiscountModels = new Set();
  const hotDiscountProducts = sortedFullPrice.filter(item => {
    const baseModel = item.itemId.split('-').slice(0, -2).join('-');
    const modelWithColor = `${baseModel}-${item.color}`;

    if (seenDiscountModels.has(modelWithColor)) {
      return false;
    }

    seenDiscountModels.add(modelWithColor);

    return true;
  });

  const finalHotDiscounts = hotDiscountProducts.slice(0, MAX_DISPLAY_ITEMS);

  return {
    isLoading,
    finalBrandNewModels,
    finalHotDiscounts,
    phonesList,
    tabletsList,
    accessoriesList,
  };
};
