import './App.scss';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';

export const App = () => (
  <div className="App">
    <Header />
    <HomePage />
    <Footer />
  </div>
);
