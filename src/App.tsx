import './App.scss';
import { Phones } from './components/modules/Phones/Phones';
import { Header } from './components/shared/Header/Header';
import { Cart } from './components/modules/Cart/Cart';

export const App = () => (
  <div className="App container">
    <Header />
    <Phones />
    <Cart />
  </div>
);
