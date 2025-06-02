import './App.modules.scss';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { PhoneCatalog } from './modules/PhonesPage/components/PhonesCatalog';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage/components/HomePage';

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones" element={<PhoneCatalog />} />
        <Route path="*" />
      </Routes>
      <Footer />
    </>
  );
};
