import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { ErrorText } from './types/ErrorText';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { ErrorContext } from './helpers/ErrorContext';
import { ProductsContext } from './helpers/ProductsContext';
import { Notification } from './components/Notification';
import { NoResults } from './components/NoResults';

const App = () => {
  const { error } = useContext(ErrorContext);
  const { isLoadProducts } = useContext(ProductsContext);

  return (
    <div className="App">
      <Header />

      <Notification />

      {isLoadProducts
        ? <Loader />
        : (error === ErrorText.NONE && <Outlet />)}

      {error !== ErrorText.NONE && <NoResults text={error} />}

      <Footer />
    </div>
  );
};

export default App;
