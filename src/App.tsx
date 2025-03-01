import './App.scss';
import { Phones } from './components/modules/Phones/Phones';
import { Header } from './components/shared/Header/Header';
import { Footer } from './components/shared/Footer/Footer';
import { Cart } from './components/modules/Cart/Cart';
import { Slider } from './components/shared/Slider/Slider';

export const App = () => (
  <>
    <Header/>
    <main className="container">
      {/* <Phones />
      <Cart /> */}
      <Slider />
    </main>
    <Footer />
  </>
);
