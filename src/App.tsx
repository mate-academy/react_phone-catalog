import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { MenuProvider } from './context/MenuProvider';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';

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
