import './App.scss';
import { BurgerMenu } from './Components/BurgerMenu/BurgerMenu';
import { Header } from './Components/Header';

export const App = () => (
  <div className="App">
    <Header />
    <BurgerMenu />
  </div>
);
