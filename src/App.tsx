import './App.scss';
import { BrandList } from './components/BrandList/BrandList';
import { HeaderBottom } from './components/HaderBottom/HeaderBottom';
import { Header } from './components/Header/Header';

export const App = () => (
  <div className="App">
    <Header />
    <HeaderBottom />
    <BrandList />
    <h1>Product Catalog</h1>
  </div>
);
