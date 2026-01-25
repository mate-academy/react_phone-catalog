import { useState, useEffect } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Phone } from '../../../types/Phone';
import { ProductYear } from '../../../types/ProductYear';

export const useNewProductsSlider = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [phonesRes, productsRes] = await Promise.all([
          fetch('/api/phones.json'),
          fetch('/api/products.json'),
        ]);

        const phonesData: Phone[] = await phonesRes.json();
        const productsData: ProductYear[] = await productsRes.json();

        const productsYearMap = new Map(
          productsData.map(product => [product.itemId, product.year]),
        );

        const sortedPhones = phonesData
          .map((phone: Phone) => ({
            ...phone,
            year: productsYearMap.get(phone.id) || 0,
          }))
          .sort((a: { year: number }, b: { year: number }) => b.year - a.year)
          .map(({ year, ...phone }: Phone & { year: number }) => phone);

        setPhones(sortedPhones.slice(0, 13));
      } catch {
        setPhones([]);
      }
    };

    load();
  }, []);

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  return {
    phones,
    setSwiperInstance,
    handlePrev,
    handleNext,
  };
};
