import { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.scss';

import { Header } from './components/Header';

import { PhoneInfoType } from './types/PhoneInfoType';
import { TabletInfoType } from './types/TabletInfoType';
import { AccessoryInfoType } from './types/AccessoryInfoType';

import './styles/style.scss';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage/HomePage';
import { MobilePhonesPage } from './components/MobilePhonesPage/MobilePhonesPage';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage/AccessoriesPage';
// import { PathProvider } from './components/contexts/pathContext';
import { PathProvider } from './components/contexts/PathContext';

export const App = () => {
  // const [newPhones, setNewPhones] = useState<PhoneInfoType[]>([]);
  // const [discountedPhones, setDiscountedPhones] = useState<PhoneInfoType[]>([]);
  // const [totalPhoneModels, setTotalPhoneModels] = useState(0);

  // const [totalTabletsModels, setTotalTabletsModels] = useState(0);
  // const [totalAccessoriesModels, setTotalAccessoriesModels] = useState(0);

  // useEffect(() => {
  //   fetch('/api/phones.json')
  //     .then(res => res.json())
  //     .then((data: PhoneInfoType[]) => {
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
    <PathProvider>
    <div className="App">
      <Header />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                // newPhones={newPhones}
                // discountedPhones={discountedPhones}
                // totalPhoneModels={totalPhoneModels}
                // totalTabletsModels={totalTabletsModels}
                // totalAccessoriesModels={totalAccessoriesModels}
              />
            }
          />

          <Route
            path="/phones"
            element={
              <MobilePhonesPage />
            }
          />

          <Route
            path="/tablets"
            element={
              <TabletsPage />
            }
          />

          <Route
            path="/accessories"
            element={
              <AccessoriesPage />
            }
          />
        </Routes>
      </main>

      <Footer />

      {/* <Routes> */}
      {/* <Route path="/" element={<BurgerNavigation />} /> */}
      {/* </Routes> */}
      {/* <Outlet />
      <footer></footer> */}
    </div>

    </PathProvider>
  );
};
