import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import './App.scss';
import { Header } from './pages/Header/Header';
import { PageUrl } from './components/PageUrl';
import { MenuBurger } from './components/MenuBurger';

const App = () => {
  return (
    <div className="App">
      <Header />
      <MenuBurger />
      <PageUrl />
      <Outlet />

      <Footer />
    </div>
  );
};

export default App;
