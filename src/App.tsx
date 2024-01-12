import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { ContextProvider } from './components/Context/Context';

export const App = () => (
  <ContextProvider>
    <div className="App">
      <Header />

      <main className="main">
        <div className="main-container">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  </ContextProvider>
);
