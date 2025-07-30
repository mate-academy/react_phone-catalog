import { useEffect, useState } from 'react';
import { AccessoryInfoType } from '../../types/AccessoryInfoType';

import { AllProductsType } from '../../types/AllProductsType';
import { PhoneInfoType } from '../../types/PhoneInfoType';
import { TabletInfoType } from '../../types/TabletInfoType';
import { BannerSwiper } from '../BannerSwiper';
import { ShopByCategorySection } from '../ShopByCategorySection';
import { SwiperSection } from '../SwiperSection';

import { useCurrentPath } from '../contexts/PathContext';

// type HomePageProps = {
//   newPhones: PhoneInfoType[];
//   discountedPhones: PhoneInfoType[];
//   totalPhoneModels: number;
//   totalTabletsModels: number;
//   totalAccessoriesModels: number;
// };

// export type AllProductsType = {
//   id: number;                 // Уникальный числовой ID
//   category: string;    // Категория (в данном случае всегда accessories)
//   itemId: string;             // Уникальный string ID (можно использовать как slug или ключ)
//   name: string;               // Название продукта
//   fullPrice: number;          // Полная цена без скидки
//   price: number;              // Цена со скидкой
//   screen: string;             // Характеристика экрана
//   capacity: string;           // Вместимость или размер (например, 44mm)
//   color: string;              // Цвет
//   ram: string;                // Объем оперативной памяти
//   year: number;               // Год выпуска
//   image: string;              // Путь к изображению
// };

export const HomePage: React.FC = () => {
  const [newPhones, setNewPhones] = useState<AllProductsType[]>([]);
  const [discountedPhones, setDiscountedPhones] = useState<AllProductsType[]>(
    [],
  );
  const [totalPhoneModels, setTotalPhoneModels] = useState(0);

  const [totalTabletsModels, setTotalTabletsModels] = useState(0);
  const [totalAccessoriesModels, setTotalAccessoriesModels] = useState(0);

  const currentPath = useCurrentPath();

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then((data: AllProductsType[]) => {
        // const newModels = data.filter(phone => phone.itemId.includes('14-pro'));
        const newModels = data
          .filter(phone => phone.year === 2022)
          .sort(() => Math.random() - 0.5)
          .slice(0, 12);
        // const hotPrices = data.filter(phone => phone.itemId.includes('13-pro'));
        const hotPrices = data
          .filter(phone => phone.year < 2022)
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
        setDiscountedPhones(hotPrices);
        setTotalPhoneModels(allPhoneModels);

        setTotalTabletsModels(allTabletsModels);
        setTotalAccessoriesModels(allAccessoriesModels);
      })
      .catch(err => console.error('Ошибка загрузки:', err));
  }, []);

  // useEffect(() => {
  //   fetch('/api/phones.json')
  //     .then(res => res.json())
  //     .then((data) => {
  //       const newModels = data.filter(phone => phone.id.includes('14-pro'));
  //       const hotPrices = data.filter(phone => phone.id.includes('13-pro'));
  //       const allPhoneModels = data.length;

  //       setNewPhones(newModels);
  //       setDiscountedPhones(hotPrices);
  //       setTotalPhoneModels(allPhoneModels);
  //     })
  //     .catch(err => console.error('Ошибка загрузки телефонов:', err));
  // }, []);

  // useEffect(() => {
  //   fetch('/api/tablets.json')
  //     .then(res => res.json())
  //     .then((data: TabletInfoType[]) => {
  //       const allTabletModels = data.length;

  //       setTotalTabletsModels(allTabletModels);
  //     })
  //     .catch(err => console.error('Ошибка загрузки ПЛАНШЕТОВ:', err));
  // }, []);

  // useEffect(() => {
  //   fetch('/api/accessories.json')
  //     .then(res => res.json())
  //     .then((data: AccessoryInfoType[]) => {
  //       const allAccessoriesModels = data.length;

  //       setTotalAccessoriesModels(allAccessoriesModels);
  //     })
  //     .catch(err => console.error('Ошибка загрузки АКЦЕССУАРЫ:', err));
  // }, []);
  return (
    <>
      <div className="section">
        <div className="title-section">
          <h1 className="title">Welcome to Nice Gadgets store! </h1>
        </div>

        <BannerSwiper />
      </div>

      <SwiperSection title="Brand New Models" phones={newPhones} />

      <ShopByCategorySection
        title="Shop By Category"
        totalPhoneModels={totalPhoneModels}
        totalTabletsModels={totalTabletsModels}
        totalAccessoriesModels={totalAccessoriesModels}
      />

      <SwiperSection
        title="Hot Prices"
        phones={discountedPhones}
        showDiscount={true}
      />
    </>
  );
};
