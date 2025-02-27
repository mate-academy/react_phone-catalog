import './App.scss';
import { Phones } from './components/modules/Phones/Phones';
import { Header } from './components/shared/Header/Header';
import { Footer } from './components/shared/Footer/Footer';
import { Cart } from './components/modules/Cart/Cart';

export const App = () => (
  <>
    <Header/>
    <main className="container">
      <Phones />
      <Cart />
    </main>
    <Footer />
  </>
);
