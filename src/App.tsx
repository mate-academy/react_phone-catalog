import './App.scss';
import './styles/fonts.scss';
import { Header } from './components/Header';

import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './modules/HomePage';

export const App = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <HomePage />
    </div>
  </BrowserRouter>
);
