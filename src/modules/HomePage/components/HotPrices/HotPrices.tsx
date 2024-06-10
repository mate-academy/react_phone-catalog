import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';

import { getPhones } from '../../../../api/getProduct';
import Product from '../../../../types/Product';
import SliderProducts from '../../../shared/SliderProducts/SliderProducts';

const HotPrices = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);

  useEffect(() => {
    setIsLoadingProduct(true);
    setIsLoading(true);
    getPhones()
      .then(res => {
        const hotPricesPhones = res.filter(
          phone => phone.priceRegular - phone.priceDiscount >= 100,
        );

        setPhones(hotPricesPhones);
        setTotalPages(Math.ceil(hotPricesPhones.length / 3));
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
        setTimeout(() => {
          setIsLoadingProduct(false);
        }, 500);
      });
  }, []);

  return (
    <SliderProducts
      sliderTitle={'Hot prices'}
      products={phones}
      totalPages={totalPages}
      isLoading={isLoading}
      isLoadingProduct={isLoadingProduct}
    />
  );
};

export default HotPrices;
