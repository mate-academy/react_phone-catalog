import './App.scss';
import { Phones } from './components/modules/Phones/Phones';
import { Header } from './components/shared/Header/Header';
import { Footer } from './components/shared/Footer/Footer';
import { Cart } from './components/modules/Cart/Cart';
import { Home } from './components/modules/Home/Home';
import { Outlet } from 'react-router-dom';

export const App = () => {

  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};


// {/* <Phones />
//       <Cart /> */}
//       <Home />
