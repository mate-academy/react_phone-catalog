import { Outlet } from 'react-router-dom';
import './styles/main.scss';
import { Header } from './components/Header';
import { MenuProvider } from './context/MenuProvider';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';

export const App = () => (
  <>
    <MenuProvider>
      <Header />
      <Menu />
    </MenuProvider>
    <main className="main">
      <div className="container">
        <Outlet />
      </div>
    </main>
    <Footer />
  </>
);
