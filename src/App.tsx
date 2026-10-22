import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';

export const App = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
    </div>
  </BrowserRouter>
);
