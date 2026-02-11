import { useState, useEffect } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Phone } from '../../../types/Phone';
import { ProductYear } from '../../../types/ProductYear';
import { fetchWithDelay } from '../../../api/fetchWithDelay';

export const useNewProductsSlider = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const [phonesRes, productsRes] = await Promise.all([
          fetchWithDelay('api/phones.json'),
          fetchWithDelay('api/products.json'),
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
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handlePrev = () => {
    if (!swiperInstance) {
      return;
    }

    if (swiperInstance.isBeginning) {
      swiperInstance.slideTo(swiperInstance.slides.length - 1);

      return;
    }

    swiperInstance.slidePrev();
  };

  const handleNext = () => {
    if (!swiperInstance) {
      return;
    }

    if (swiperInstance.isEnd) {
      swiperInstance.slideTo(0);

      return;
    }

    swiperInstance.slideNext();
  };

  return {
    phones,
    isLoading,
    setSwiperInstance,
    handlePrev,
    handleNext,
  };
};
