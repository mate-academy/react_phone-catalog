import { Header } from './components/header/header';
import { Home } from './components/home';
import '../src/styles/main.scss';
import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  );
};
