import './App.scss';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { BrandNewModels } from './components/BrandNewModels';
import { Categories } from './components/Categories';

export const App = () => (
  <div className="App">
    <Header />
    <main className="section">
      <div className="container">
        <HeroSlider />
        <BrandNewModels />
        <Categories />
      </div>
    </main>
  </div>
);
