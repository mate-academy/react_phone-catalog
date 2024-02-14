import './App.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { GeneralProvider } from './helpers/GeneralContext';

export const App = () => (
  <GeneralProvider>
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
  </GeneralProvider>
);
