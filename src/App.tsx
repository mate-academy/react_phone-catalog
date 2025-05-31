import './App.modules.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { PhoneCatalog } from './modules/PhonesPage/components/PhonesCatalog';
import { Route, Routes } from 'react-router-dom';
import { Slider } from './modules/HomePage/components/Slider';

export const App = () => {
  return (
    <>
      <Header />
      <Slider />
      <Routes>
        <Route path="/phones" element={<PhoneCatalog />} />
        <Route path="*" />
      </Routes>
      <Footer />
    </>
  );
};
