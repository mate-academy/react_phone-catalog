import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MenuProvider } from './context/MenuProvider';
import { Menu } from './components/Menu';

export const App = () => {
  return (
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
};
