import './App.scss';
import './styles/fonts.scss';
import { Header } from './components/Header';

import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { Footer } from './components/Footer';

export const App = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <HomePage />
      <Footer />
    </div>
  </BrowserRouter>
);
