import './App.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MainProvider } from './helpers/GeneralContext';

export const App = () => (
  <MainProvider>
    <div className="App">
      <Header />

      <main className="main">
        <div className="wrapper">
          <Outlet />
        </div>
      </main>

      <div />

      <Footer />
    </div>
  </MainProvider>
);
