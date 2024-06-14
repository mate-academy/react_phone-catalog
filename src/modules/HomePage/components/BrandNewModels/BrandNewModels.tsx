import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {
  getAccessories,
  getPhones,
  getTablets,
} from '../../../../api/getProduct';
import { useEffect, useState } from 'react';

import Product from '../../../../types/Product';
import SliderProducts from '../../../shared/SliderProducts/SliderProducts';

const BrandNewModels = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchAllData = async () => {
      try {
        const [phones, tablets, accessories] = await Promise.all([
          getPhones(),
          getTablets(),
          getAccessories(),
        ]);

        const allProducts = [...phones, ...tablets, ...accessories];

        const noDiscountProducts = allProducts.filter(
          product => product.priceRegular === product.priceDiscount,
        );

        const sortedProducts = (
          noDiscountProducts.length === 0 ? allProducts : noDiscountProducts
        ).sort((a, b) => b.priceRegular - a.priceRegular);

        setProducts(sortedProducts);
        setTotalPages(Math.ceil(sortedProducts.length / 4));
      } catch (error) {
        setIsError(true);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      }
    };

    fetchAllData();
  }, []);

  return (
    <SliderProducts
      sliderTitle={'Brand new models'}
      products={products}
      totalPages={totalPages}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default BrandNewModels;
