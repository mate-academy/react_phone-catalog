import { useEffect, useMemo, useState } from 'react';
import { Slider } from '../../components/Slider';
import { ShopBy } from '../../components/ShopBy';
import { SliderPhones } from '../../components/SliderPhones';

import s from './HomePage.module.scss';
import { getBrandNew, getHotPrice } from '../../services/getProducts';
import { wait } from '../../httpClient';
import { Loader } from '../../components/Loader';
import { useAppSelector } from '../../hooks';

export const HomePage = () => {
  const { products } = useAppSelector(state => state.products);
  const productsBrand = useMemo(() => getBrandNew(products), [products.length]);
  const productsHot = useMemo(() => getHotPrice(products), [products.length]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = `Nice Gadgets`;

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
