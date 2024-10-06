import { useEffect, useState } from 'react';
import { Product } from '../types/Product';
import { getProducts } from './getProducts';

export const GetSliderProducts = (category: string) => {
  const [sliderProducts, setSliderProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setSliderProducts);
  }, []);

  if (category === 'brand') {
    return sliderProducts.sort((a, b) => b.year - a.year);
  } else if (category === 'hot') {
    return sliderProducts.sort(
      (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
    );
  } else {
    sliderProducts
      .sort(() => Math.round(Math.random() * 100) - 50)
      .sort(() => Math.round(Math.random() * 100) - 50);
  }

  return sliderProducts;
};

export const GetAmountOfSliderProducts = () => {
  const [amount, setAmount] = useState(Math.floor(window.innerWidth / 269) + 1);

  useEffect(() => {
    const getAmount = () => {
      if (Math.floor(window.innerWidth / 269) !== amount) {
        setAmount(Math.floor(window.innerWidth / 269) + 1);
      }
    };

    getAmount();
    window.addEventListener('resize', getAmount);

    return () => window.removeEventListener('resize', getAmount);
  }, [amount]);

  return amount;
};
