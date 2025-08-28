import { useEffect, useState } from 'react';

import { AllProductsType } from '../../types/AllProductsType';
import { BannerSwiper } from '../BannerSwiper';
import { ShopByCategorySection } from '../ShopByCategorySection';
import { SwiperSection } from '../SwiperSection';

export const HomePage: React.FC = () => {
  const [newPhones, setNewPhones] = useState<AllProductsType[]>([]);
  const [discountedProducts, setDiscountedProducts] = useState<
    AllProductsType[]
  >([]);
  const [totalPhoneModels, setTotalPhoneModels] = useState(0);

  const [totalTabletsModels, setTotalTabletsModels] = useState(0);
  const [totalAccessoriesModels, setTotalAccessoriesModels] = useState(0);

  useEffect(() => {
    fetch('api/products.json')
      .then(res => res.json())
      .then((data: AllProductsType[]) => {
        const newModels = data
          .filter(phone => phone.year === 2022)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);

        const hotPrices = data
          .filter(models => models.year < 2021)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);

        const allPhoneModels = data.filter(
          phone => phone.category === 'phones',
        ).length;

        const allTabletsModels = data.filter(
          tablet => tablet.category === 'tablets',
        ).length;
        const allAccessoriesModels = data.filter(
          accessory => accessory.category === 'accessories',
        ).length;

        setNewPhones(newModels);
        setDiscountedProducts(hotPrices);
        setTotalPhoneModels(allPhoneModels);

        setTotalTabletsModels(allTabletsModels);
        setTotalAccessoriesModels(allAccessoriesModels);
      })
      .catch(err => console.error('Ошибка загрузки:', err));
  }, []);

  return (
    <>
      <div className="section">
        <div className="title-section">
          <h1 className="title">Welcome to Nice Gadgets store! </h1>
        </div>

        <BannerSwiper />
      </div>

      <SwiperSection title="Brand New Models" products={newPhones} />

      <ShopByCategorySection
        title="Shop By Category"
        totalPhoneModels={totalPhoneModels}
        totalTabletsModels={totalTabletsModels}
        totalAccessoriesModels={totalAccessoriesModels}
      />

      <SwiperSection
        title="Hot Prices"
        products={discountedProducts}
        showDiscount={true}
      />
    </>
  );
};
