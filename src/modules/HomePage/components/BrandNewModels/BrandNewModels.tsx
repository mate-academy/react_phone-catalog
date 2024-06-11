import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';

import { getPhones } from '../../../../api/getProduct';
import Product from '../../../../types/Product';
import SliderProducts from '../../../shared/SliderProducts/SliderProducts';

const BrandNewModels = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoadingProduct(true);
    setIsLoading(true);
    getPhones()
      .then(res => {
        const newModel = '14';
        const brandNewPhones = res.filter(phone =>
          phone.name.includes(newModel),
        );

        setPhones(brandNewPhones);
        setTotalPages(Math.ceil(brandNewPhones.length / 4));
      })
      .catch(() => {
        setIsError(true);
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
      sliderTitle={'Brand new models'}
      products={phones}
      totalPages={totalPages}
      isLoading={isLoading}
      isLoadingProduct={isLoadingProduct}
      isError={isError}
    />
  );
};

export default BrandNewModels;
