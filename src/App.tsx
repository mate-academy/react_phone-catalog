import { Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import './App.scss';
import { Footer } from './components/Footer';
import { SideMenu } from './components/SideMenu';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <SideMenu />

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};
