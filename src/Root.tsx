import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import WelcomeSlider from './components/WelcomeSlider';
import MobilePhones from './components/MobilePhones';
import NewBrand from './components/NewBrand';
import Categories from './components/Categories';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/phones" element={<MobilePhones gadgets={'phones'} />} />
      <Route path="/tablets" element={<MobilePhones gadgets={'tablets'} />} />
      <Route
        path="/accessories"
        element={<MobilePhones gadgets={'accessories'} />}
      />
    </Routes>
  );
};
