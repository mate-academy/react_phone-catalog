import './App.scss';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { StateStore } from './store/StoreContext';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';

const App = () => {
  const { isError, isLoader } = useContext(StateStore);

  return (
    <div className="App">
      <Header />

      <div className="container">

        {
          isLoader && (<Loader />)
        }

        {
          !isLoader && (
            isError ? (
              <ErrorMessage />
            ) : (
              <Outlet />
            )
          )
        }
      </div>

      <Footer />
    </div>
  );
};

export default App;
