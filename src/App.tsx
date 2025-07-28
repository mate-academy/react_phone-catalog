import { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.scss';

import { BannerSwiper } from './components/BannerSwiper';
import { Header } from './components/Header';
import { ShopByCategorySection } from './components/ShopByCategorySection';
import { SwiperSection } from './components/SwiperSection';
import { PhoneInfoType } from './types/PhoneInfoType';
import { TabletInfoType } from './types/TabletInfoType';
import { AccessoryInfoType } from './types/AccessoryInfoType';

import './styles/style.scss';
import { Footer } from './components/Footer';

export const App = () => {
  const [newPhones, setNewPhones] = useState<PhoneInfoType[]>([]);
  const [discountedPhones, setDiscountedPhones] = useState<PhoneInfoType[]>([]);
  const [totalPhoneModels, setTotalPhoneModels] = useState(0);

  const [tablets, setTablets] = useState<TabletInfoType[]>([]);
  const [totalTabletsModels, setTotalTabletsModels] = useState(0);

  const [accessories, setAccessories] = useState<AccessoryInfoType[]>([]);
  const [totalAccessoriesModels, setTotalAccessoriesModels] = useState(0);

  useEffect(() => {
    fetch('/api/phones.json')
      .then(res => res.json())
      .then((data: PhoneInfoType[]) => {
        const newModels = data.filter(phone => phone.id.includes('14-pro'));
        const hotPrices = data.filter(phone => phone.id.includes('13-pro'));
        const allPhoneModels = data.length;

        setNewPhones(newModels);
        setDiscountedPhones(hotPrices);
        setTotalPhoneModels(allPhoneModels);
      })
      .catch(err => console.error('Ошибка загрузки телефонов:', err));
  }, []);

  useEffect(() => {
    fetch('/api/tablets.json')
      .then(res => res.json())
      .then((data: TabletInfoType[]) => {
        const tablets = data.filter(tablet => tablet.category === 'tablets');
        const allTabletModels = data.length;

        setTotalTabletsModels(allTabletModels);
        setTablets(tablets);
      })
      .catch(err => console.error('Ошибка загрузки телефонов:', err));
  }, []);

  useEffect(() => {
    fetch('/api/accessories.json')
      .then(res => res.json())
      .then((data: AccessoryInfoType[]) => {
        const accessories = data.filter(
          accessory => accessory.category === 'accessories',
        );
        const allAccessoriesModels = data.length;

        setTotalAccessoriesModels(allAccessoriesModels);
        setAccessories(accessories);
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
      </main>

      <Footer/>

      {/* <Routes> */}
      {/* <Route path="/" element={<BurgerNavigation />} /> */}
      {/* </Routes> */}
      {/* <Outlet />
      <footer></footer> */}
    </div>
  );
};
