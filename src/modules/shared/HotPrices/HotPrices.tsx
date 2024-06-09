import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';

import { getPhones } from '../../../api/getProduct';
import Product from '../../../types/Product';
import SliderProducts from '../SliderProducts/SliderProducts';

const HotPrices = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getPhones().then(res => {
      const hotPricesPhones = res.filter(
        phone => phone.priceRegular - phone.priceDiscount >= 100,
      );

      setPhones(hotPricesPhones);
      setTotalPages(Math.ceil(hotPricesPhones.length / 3));
    });
  }, []);

  return (
    <SliderProducts
      sliderTitle={'Hot prices'}
      products={phones}
      totalPages={totalPages}
    />
  );
};

export default HotPrices;
