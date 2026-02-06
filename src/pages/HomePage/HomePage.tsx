import './HomePage.scss';
import { BannerSwiper } from './BannerSwiper';
import { ModelsSlider } from './ModelsSlider';
import { useEffect, useState } from 'react';
import { ProductsType } from '../../types/ProductsType';
import { ShopByCategory } from './ShopByCategory/ShopByCategory';

export const HomePage: React.FC = () => {
  const [newPhones, setNewPhones] = useState<ProductsType[]>([]);
  const [discountProducts, setDicsountProducts] = useState<ProductsType[]>([]);
  const [totalPhonesModels, setTotalPhonesModels] = useState(0);
  const [totalTabletsModels, setTotalTabletsModels] = useState(0);
  const [totalAccessoriesModels, setTotalAccessoriesModels] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then((data: ProductsType[]) => {
        const newModels = data
          .filter(phone => phone.year === 2022)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);

        const hotPrices = data
          .filter(models => models.year < 2021)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);

        const allPhonesModels = data.filter(
          phone => phone.category === 'phones',
        ).length;

        const allTabletsModels = data.filter(
          tablet => tablet.category === 'tablets',
        ).length;

        const allAccssoriesModels = data.filter(
          accessory => accessory.category === 'accessories',
        ).length;

        setNewPhones(newModels);
        setDicsountProducts(hotPrices);

        setTotalPhonesModels(allPhonesModels);
        setTotalTabletsModels(allTabletsModels);
        setTotalAccessoriesModels(allAccssoriesModels);

        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="titleMate">Product Catalog</h1>
      <div className="section">
        <div className="section__title">
          <h2 className="pageTitle">Welcome to Nice Gadgets store!</h2>
        </div>
        <BannerSwiper isSkeleton={isLoading} />
      </div>

      <ModelsSlider
        title="Brands New Models"
        products={newPhones}
        isSkeleton={isLoading}
      />

      <ShopByCategory
        title="Shop by category"
        totalPhonesModels={totalPhonesModels}
        totalTabletsModels={totalTabletsModels}
        totalAccessoriesModels={totalAccessoriesModels}
        isSkeleton={isLoading}
      />

      <ModelsSlider
        title="Hot Prices"
        products={discountProducts}
        showDiscount={true}
        isSkeleton={isLoading}
      />
    </>
  );
};
