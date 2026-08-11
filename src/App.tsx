import { AppRoutes } from './AppRoutes';
import './styles/globals.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Loader } from './components/Loader';
import { useApp } from './context/AppContext';

export const App = () => {
  const { isLoading } = useApp();

  return (
    <div className="app">
      <Header />

      <main className="main-content ">
        {isLoading ? <Loader /> : <AppRoutes />}
      </main>

      <Footer />
    </div>
  );
};
