import './App.scss';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';
import { StoreProvider } from './context/StoreContext';

export const App = () => (
  <>
    <StoreProvider>
      <NavBar />

      <div className="main-container">
        <Outlet />
      </div>

      <Footer />
    </StoreProvider>
  </>
);
