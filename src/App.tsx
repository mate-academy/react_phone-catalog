import './App.scss';
import { BrandList } from './components/Body/BrandList'
import { Category } from './components/Body/Category';
import { HotPricesList } from './components/Body/HotPricesList';
import { Footer } from './components/Footer';
import { HeaderBottom } from './components/Header/HaderBottom';
import { Header } from './components/Header/Header';

export const App = () => (
  <div className="App">
    <Header />
    <HeaderBottom />
    <BrandList />
    <Category />
    <HotPricesList />
    <Footer />
  </div>
);
