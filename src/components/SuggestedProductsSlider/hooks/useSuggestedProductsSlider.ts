import { useEffect, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Phone } from '../../../types/Phone';
import { getSuggestedProducts } from '../../../api/products';

type ProductCategory = 'phones' | 'tablets' | 'accessories';

export const useSuggestedProductsSlider = (
  category?: ProductCategory,
  excludeId?: string,
) => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!category) {
        setPhones([]);

        return;
      }

      try {
        setIsLoading(true);
        const data = await getSuggestedProducts(category, excludeId, 10);

        setPhones(data);
      } catch {
        setPhones([]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [category, excludeId]);

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
