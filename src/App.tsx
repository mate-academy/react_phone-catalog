import { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.scss';

import { BannerSwiper } from './components/BannerSwiper';
import { Header } from './components/Header';
import { SwiperSection } from './components/SwiperSection';
// import { PhoneCard } from './components/PhoneCard';

import './styles/style.scss';

type ProductInfo = {
  id: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  capacity: string;
  ram: string;
  screen: string;
  images: string[];
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

        {/* <BrendNewModels /> */}

        <SwiperSection title="Brand New Models" phones={newPhones} />

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
