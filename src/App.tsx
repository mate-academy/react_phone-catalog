import { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.scss';

import { BannerSwiper } from './components/BannerSwiper';
import { Header } from './components/Header';
import { ShopByCategorySection } from './components/ShopByCategorySection';
import { SwiperSection } from './components/SwiperSection';
// import { PhoneCard } from './components/PhoneCard';

import './styles/style.scss';

// type ProductInfo = {
//   id: string;
//   name: string;
//   priceRegular: number;
//   priceDiscount: number;
//   capacity: string;
//   ram: string;
//   screen: string;
//   images: string[];
// };

type ProductInfo = {
  id: string;                     // Уникальный ID устройства
  category: string;               // Категория товара (например, "tablets")
  namespaceId: string;            // Общий ID модели (без цвета и памяти)
  name: string;                   // Полное имя устройства
  capacityAvailable: string[];    // Список доступных объемов памяти
  capacity: string;               // Текущий объем памяти
  priceRegular: number;           // Обычная цена
  priceDiscount: number;          // Цена со скидкой
  colorsAvailable: string[];      // Список доступных цветов
  color: string;                  // Текущий цвет
  images: string[];               // Пути к изображениям
  description: {
    title: string;                // Заголовок блока описания
    text: string[];               // Текстовые абзацы в этом блоке
  }[];
  screen: string;                 // Тип экрана
  resolution: string;             // Разрешение
  processor: string;              // Процессор
  ram: string;                    // Оперативная память
  camera: string;                 // Камера
  zoom: string;                   // Зум
  cell: string[];                 // Сотовая связь (если есть)
};

export const App = () => {
  const [newPhones, setNewPhones] = useState<ProductInfo[]>([]);
  const [discountedPhones, setDiscountedPhones] = useState<ProductInfo[]>([]);

  useEffect(() => {
    fetch('/api/phones.json')
      .then(res => res.json())
      .then((data: ProductInfo[]) => {
        const newModels = data.filter(phone => phone.id.includes('14-pro'));
        const hotPrices = data.filter(phone => phone.id.includes('13-pro'));
        // const allPhones = datf.filter(phone => )

        setNewPhones(newModels);
        setDiscountedPhones(hotPrices);
      })
      .catch(err => console.error('Ошибка загрузки телефонов:', err));
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main">
        <div className="section">
          <div className="title-section">
            <h1 className="title">Welcome to Nice Gadgets store!</h1>
          </div>

          <BannerSwiper />
        </div>

        <SwiperSection title="Brand New Models" phones={newPhones} />

        <ShopByCategorySection title="Shop By Category"/>

        <SwiperSection
          title="Hot Prices"
          phones={discountedPhones}
          showDiscount={true}
        />
      </main>

      {/* <Routes> */}
      {/* <Route path="/" element={<BurgerNavigation />} /> */}
      {/* </Routes> */}
      {/* <Outlet />
      <footer></footer> */}
    </div>
  );
};
