import { useEffect, useMemo, useState } from 'react';
import { Slider } from '../../components/Slider';
import { ShopBy } from '../../components/ShopBy';
import { SliderPhones } from '../../components/SliderPhones';

import s from './HomePage.module.scss';
import { getBrandNew, getHotPrice } from '../../services/products';
import { useProducts } from '../../context/ProductsContext';
import { wait } from '../../httpClient';
import { Loader } from '../../components/Loader';

export const HomePage = () => {
  const products = useProducts();
  const productsBrand = useMemo(() => getBrandNew(products), [products.length]);
  const productsHot = useMemo(() => getHotPrice(products), [products.length]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLoading = async () => {
      setIsLoading(true);
      await wait();
      setIsLoading(false);
    };

    handleLoading();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h2 className={s.HomePage__title}>Welcome to Nice Gadgets store!</h2>
      <Slider />
      <SliderPhones title="Brand new modules" products={productsBrand} />
      <ShopBy />
      <SliderPhones title="Hot prices" products={productsHot} isHot={true} />
    </>
  );
};
