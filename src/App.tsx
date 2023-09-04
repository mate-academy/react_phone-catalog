import './App.scss';
import { ProductCard } from './components/ProductCard';
import { getProduct } from './utils/product-mocks';

const App = () => {
  return (
    <div className="App">
      <ProductCard product={getProduct()} />
    </div>
  );
};

export default App;
