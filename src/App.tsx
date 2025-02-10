import './App.scss';
import { Phones } from './components/modules/Phones/Phones';
import { Header } from './components/shared/Header/Header';

export const App = () => (
  <div className="App container">
    <Header />
    <Phones />
  </div>
);
