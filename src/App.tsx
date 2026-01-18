import './App.scss';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';

export const App = () => (
  <div className="App">
    <Header />
    <main className="section">
      <div className="container">
        <HeroSlider />
      </div>
    </main>
  </div>
);
