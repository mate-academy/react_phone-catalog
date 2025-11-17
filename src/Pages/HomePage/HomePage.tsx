import style from './HomePage.module.scss';

import { useState, useEffect } from 'react';
import { getProductsData } from '../../api/products';
import { SwiperSection } from '../../components/SwiperSection';
import PicturesSlider from '../../components/PicturesSlider/PicturesSlider';

export const HomePage = () => {
  const [newPhones, setNewPhones] = useState<AllProductsType[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<
    AllProductsType[]
  >([]);

  const [totalPhoneModels, setTotalPhoneModels] = useState(0);
  const [totalTabletsModels, setTotalTabletsModels] = useState(0);
  const [totalAccessoriesModels, setTotalAccessoriesModels] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductsData();

        setNewPhones(data.newModels);
        setDiscountedProducts(data.hotPrices);

        setTotalPhoneModels(data.totalPhoneModels);
        setTotalTabletsModels(data.totalTabletsModels);
        setTotalAccessoriesModels(data.totalAccessoriesModels);
      } catch (err) {
        setError('Failed to load products');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className={style.visuallyHidden}>Product Catalog</h1>
      <h2 className="title">Welcome to Nice Gadgets store!</h2>

      <PicturesSlider />

      <SwiperSection title="Brand New Models" products={newPhones} />
    </>
  );
};
