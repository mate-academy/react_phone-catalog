import './App.scss';
import { Outlet, Route } from 'react-router-dom';
import WelcomeSlider from './components/WelcomeSlider';
import NewBrand from './components/NewBrand';
import Categories from './components/Categories';
import HotPrices from './components/HotPrices';
import Footer from './components/Footer';
// import { Routes, Route } from 'react-router-dom';

export const App = () => {
  return (
    <div className="App">
      <WelcomeSlider />
      <NewBrand />
      <Categories />
      <HotPrices />
      <Footer />
    </div>
  );
};
