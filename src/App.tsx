import './App.scss';
import { Header } from './Header/Header';
import { BrowserRouter } from 'react-router-dom';
import { Main } from './Main/Main';

export const App = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Main />
    </div>
  </BrowserRouter>
);
