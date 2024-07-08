import './App.module.scss';
import { Loader } from './components/Loader/Loader';
import { ProductCard } from './components/ProductCard/ProductCard';
import { ProductSlider } from './components/ProductSlider';

export const App: React.FC = () => (
  <div className="App">
    <h1>This webiste is under construction...</h1>
    <Loader />
    <ProductSlider />
    <ProductCard />
  </div>
);
