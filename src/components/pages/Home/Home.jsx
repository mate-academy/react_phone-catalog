import HotPrice from './Hot_prices/HotPrices';
import NewModels from './NewModels/NewModels';
import phones from '../../../data/phones.json';
import tablets from '../../../data/tablets.json';
import accessories from '../../../data/accessories.json';
import { CategoryGrid } from './Category/Category';
import { HomeSlider } from './HomeSlider/HomeSlider';

import React, { useMemo } from 'react';

export const Home = () => {
  const getCategory = product => {
    if ('screen' in product && 'ram' in product) {
      return 'phones';
    }

    if ('screen' in product && 'resolution' in product) {
      return 'tablets';
    }

    return 'accessories';
  };

  const shuffleArray = array => {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  };

  const filteredPhones = useMemo(
    () => phones.filter(item => item.priceRegular != null),
    [],
  );
  const filteredTablets = useMemo(
    () => tablets.filter(item => item.priceRegular != null),
    [],
  );
  const filteredAccessories = useMemo(
    () => accessories.filter(item => item.priceRegular != null),
    [],
  );

  const hotProductsCombined = useMemo(() => {
    const allFilteredProducts = [
      ...filteredPhones,
      ...filteredTablets,
      ...filteredAccessories,
    ];

    // Обмежити 12 шт:
    return shuffleArray(allFilteredProducts).slice(0, 12);
  }, [filteredPhones, filteredTablets, filteredAccessories]);

  const addCategory = (items, category) =>
    items.map(item => ({ ...item, category }));

  const filteredPhonesNew = useMemo(
    () =>
      addCategory(
        phones.filter(item => item.newModel === 'yes'),
        'phones',
      ),
    [],
  );
  const filteredTabletsNew = useMemo(
    () =>
      addCategory(
        tablets.filter(item => item.newModel === 'yes'),
        'tablets',
      ),
    [],
  );
  const filteredAccessoriesNew = useMemo(
    () =>
      addCategory(
        accessories.filter(item => item.newModel === 'yes'),
        'accessories',
      ),
    [],
  );

  const allFilteredProductsNew = useMemo(
    () => [
      ...filteredPhonesNew,
      ...filteredTabletsNew,
      ...filteredAccessoriesNew,
    ],
    [filteredPhonesNew, filteredTabletsNew, filteredAccessoriesNew],
  );

  return (
    <>
      <HomeSlider />
      <NewModels
        products={allFilteredProductsNew.map(product => ({
          ...product,
          category: product.category || getCategory(product),
        }))}
      />
      <CategoryGrid />
      <HotPrice
        products={hotProductsCombined.map(product => ({
          ...product,
          category: product.category || getCategory(product),
        }))}
      />
    </>
  );
};
