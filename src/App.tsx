import './App.scss';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { BrandNewModels } from './components/BrandNewModels';

export const App = () => (
  <div className="App">
    <Header />
    <main className="section">
      <div className="container">
        <HeroSlider />
        <BrandNewModels />
      </div>
    </main>
  </div>
);
