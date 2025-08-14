import './App.scss';
import { CartItem } from './modules/CartPage/components/CartItem/CartItem';
// import { Footer } from './modules/shared/components/Footer';
import { Header } from './modules/shared/components/Header';
// import { ProductCard } from './modules/shared/components/ProductCard';

export const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <CartItem></CartItem>
    </div>
  );
};
