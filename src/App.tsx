import { Outlet } from 'react-router-dom';
import './App.scss';
import { useContext } from 'react';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { GlobalContext } from './components/Context/GlobalContext';
import { Loader } from './components/Loader/Loader';

const App = () => {
  const { isLoading } = useContext(GlobalContext);

  return (
    <div className="App">
      <Header />

      <main className="main-content">
        <div className="main-content__container">
          {isLoading ? (
            <Loader />
          ) : (
            <Outlet />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
