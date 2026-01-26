import { useState, useEffect } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Phone } from '../../../types/Phone';

export const useHotPricesSlider = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/phones.json');
        const phonesData: Phone[] = await res.json();

        const sortedPhones = phonesData
          .map(phone => {
            const discount =
              phone.priceDiscount && phone.priceDiscount > 0
                ? phone.priceRegular - phone.priceDiscount
                : 0;

            return { ...phone, discount };
          })
          .sort((a, b) => b.discount - a.discount)
          .filter(phone => phone.discount > 0)
          .map(({ discount, ...phone }) => phone);

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
