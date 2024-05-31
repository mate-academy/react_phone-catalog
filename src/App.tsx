import './App.module.scss';
import { Loader } from './components/Loader/Loader';
import { ProductCard } from './components/ProductCard/ProductCard';

export const App: React.FC = () => (
  <div className="App">
    <h1>This webiste is under construction...</h1>
    <Loader />
    <ProductCard />
  </div>
);
