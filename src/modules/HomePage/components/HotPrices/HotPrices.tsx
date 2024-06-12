import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';

import {
  getAccessories,
  getPhones,
  getTablets,
} from '../../../../api/getProduct';
import Product from '../../../../types/Product';
import SliderProducts from '../../../shared/SliderProducts/SliderProducts';

const HotPrices = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async (
    fetchFunction: () => Promise<Product[]>,
    setState: React.Dispatch<React.SetStateAction<Product[]>>,
  ): Promise<number> => {
    try {
      const res = await fetchFunction();
      const hotPrices = res.filter(
        product =>
          product.priceRegular - product.priceDiscount <= 200 &&
          product.priceRegular - product.priceDiscount >= 60,
      );
      const sortHotPrice = hotPrices.sort(
        (a, b) => b.priceRegular - a.priceRegular,
      );

      setState(sortHotPrice);

      return sortHotPrice.length;
    } catch (error) {
      setIsError(true);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
      setTimeout(() => {
        setIsLoadingProduct(false);
      }, 500);
    }

    return 0;
  };

  useEffect(() => {
    setIsLoadingProduct(true);
    setIsLoading(true);

    const fetchAllData = async () => {
      const phonesCount = await fetchData(getPhones, setPhones);
      const tabletsCount = await fetchData(getTablets, setTablets);
      const accessoriesCount = await fetchData(getAccessories, setAccessories);

      const totalCount = phonesCount + tabletsCount + accessoriesCount;

      setTotalPages(Math.ceil(totalCount / 3));
    };

    fetchAllData();
  }, []);

  const allProducts = [...phones, ...tablets, ...accessories];

  return (
    <SliderProducts
      sliderTitle={'Hot prices'}
      products={allProducts}
      totalPages={totalPages}
      isLoading={isLoading}
      isLoadingProduct={isLoadingProduct}
      isError={isError}
    />
  );
};

export default HotPrices;
