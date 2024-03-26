import { useEffect, useState } from 'react';
import './HomePage.scss';
import { getData } from '../../helpers/getData';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Product } from '../../types/Product';
import { ShopByCategories } from '../../components/ShopByCategories';
import { PicturesSlider } from '../../components/PicturesSlider';
import { ShopByCategoryDataItem } from '../../types/ShopByCategoryItem';

export const HomePage = () => {
  const [hotPricesProducts, setHotPricesProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);
  const [ShopByCatData, setShopByCatData] = useState<ShopByCategoryDataItem[]>(
    [],
  );

  useEffect(() => {
    getData
      .getHomePageData()
      .then(data => {
        setBrandNewProducts(data.brandNew);
        setHotPricesProducts(data.hotPriceProducts);
        setShopByCatData(data.shopByCategoryData);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="page">
      <div className="page__content">
        <h1 className="page__title home-page__title">
          Welcome to Nice Gadgets store!
        </h1>
        <PicturesSlider />
        <ProductsSlider
          products={brandNewProducts}
          sliderTitle="Brand new models"
        />
        <ShopByCategories ShopByCatData={ShopByCatData} />
        <ProductsSlider products={hotPricesProducts} sliderTitle="Hot prices" />
      </div>
    </main>
  );
};
