import { useState, useEffect } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Phone } from '../../../types/Phone';

export const useHotPricesSlider = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
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
