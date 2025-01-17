import { Outlet } from 'react-router-dom';
import './App.scss';
import './i18n';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from './hooks/hooks';

export const App = () => {
  const { theme } = useAppSelector(state => state.theme);

  const toastStyle =
    theme === 'light'
      ? { background: '#333', color: '#fff' }
      : { background: '#fff', color: '#000' };

  return (
    <div className="App">
      <ToastContainer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: toastStyle,
        }}
      />
      <h1 className="App__title">Product Catalog</h1>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
