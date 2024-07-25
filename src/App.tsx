import './App.scss';
import './styles/main.scss';
import { Header } from './components/Header';
import { Welcome } from './components/Welcome';
import { NewModels } from './components/NewModels';
import { HotPrice } from './components/HotPrice';
import { Category } from './components/Category';
import { Footer } from './components/Footer';

export const App = () => (
  <div className="App">
    <h1 className="visually-hidden">Product Catalog</h1>
    <Header />

    <div className="container">
      <Welcome />
      <NewModels />
      <Category />
      <HotPrice />
      <Footer />
    </div>
  </div>
);
