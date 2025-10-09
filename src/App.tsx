import './App.scss';
import { Header } from './Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { ProductSlider } from './Main/ProductSlider/ProductSlider';

export const App = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <ProductSlider />
    </div>
  </BrowserRouter>
);
