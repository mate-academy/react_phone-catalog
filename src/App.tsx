import { useContext } from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { StateStore } from './store/StoreContext';
import { Header } from './components/Header/Header';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  const { isError, isLoading } = useContext(StateStore);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="App">
      <Header />

      <div className="container">

        {isLoading && (
          <Loader />
        )}

        {!isLoading && (
          isError ? (
            <ErrorMessage />
          ) : (
            <Outlet />
          )
        )}
      </div>

      <Footer />
    </div>
  );
};
