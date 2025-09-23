import './App.scss';
import { Header } from './Header/Header';
import { BrowserRouter } from 'react-router-dom';

export const App = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
    </div>
  </BrowserRouter>
);
