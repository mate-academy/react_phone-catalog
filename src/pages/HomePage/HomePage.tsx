import './HomePage.scss';
import { useEffect, useState } from 'react';
import { BannerSlider } from '../../components/BannerSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import {
  getAccessories,
  getBrandNewProducts,
  getHotPriceProducts,
  getPhones,
  getTablets,
} from '../../api/products';
import { Product } from '../../types/Product';

export const HomePage = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[] | []>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[] | []>([]);
  const [phones, setPhones] = useState<Product[] | []>([]);
  const [tablets, setTablets] = useState<Product[] | []>([]);
  const [accessories, setAccessories] = useState<Product[] | []>([]);

  useEffect(() => {
    getHotPriceProducts().then(setHotPriceProducts);
    getBrandNewProducts().then(setBrandNewProducts);
    getPhones().then(setPhones);
    getTablets().then(setTablets);
    getAccessories().then(setAccessories);
  }, []);

  return (
    <div className="homePage">
      <div className="homePage__bannerSlider">
        <BannerSlider>
          <div className="homePage__bannerImage homePage__bannerImage--1" />
          <div className="homePage__bannerImage homePage__bannerImage--2" />
          <div className="homePage__bannerImage homePage__bannerImage--3" />
        </BannerSlider>
      </div>

      <div className="homePage__hotPrices">
        <ProductsSlider title="Hot prices" products={hotPriceProducts} />
      </div>

      <div className="homePage__shopByCategory">
        <ShopByCategory
          phonesLength={phones.length}
          tabletsLength={tablets.length}
          accessoriesLength={accessories.length}
        />
      </div>

      <div className="homePage__brandNewModels">
        <ProductsSlider title="Brand new models" products={brandNewProducts} />
      </div>
    </div>
  );
};
