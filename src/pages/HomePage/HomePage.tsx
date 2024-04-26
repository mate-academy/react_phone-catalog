import './HomePage.scss';
import { useEffect, useState } from 'react';
import { Categories } from '../../components/Categories';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getBrandNew, getHotPrices } from '../../api/api';
import { Product } from '../../types/Product';

export const HomePage = () => {
  const [hotPrices, setHotPrices] = useState<Product[]>([]);
  const [brandNew, setBrandNew] = useState<Product[]>([]);

  useEffect(() => {
    const fetchHotPrices = async () => {
      const hotPricesProducts = await getHotPrices;

      setHotPrices(hotPricesProducts);
    };

    const fetchBrandNew = async () => {
      const brandNewProducts = await getBrandNew;

      setBrandNew(brandNewProducts);
    };

    fetchHotPrices();
    fetchBrandNew();
  }, []);

  return (
    <div className="container">
      <div className="page">
        <h1 className="page__title">Welcome to Nice Gadgets store!</h1>
        <PicturesSlider />
        <ProductsSlider title="Hot prices" products={hotPrices} />
        <Categories />
        <ProductsSlider title="Brand new models" products={brandNew} />
      </div>
    </div>
  );
};
