import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './Components/Footer';
import { Header } from './Components/Header';
import './styles/styles.scss';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
      {<Footer />}
    </div>
  );
};
