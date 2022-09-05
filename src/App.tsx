import './App.scss';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage';
import { getProducts } from './api';
import { Product } from './types/Product';
import { ErrorType } from './enums/ErrorType';

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //
  //   getProducts()
  //     .then(setProducts)
  //     .catch(() => setErrorType(ErrorType.LoadFromServer))
  //     .finally(() => setIsLoading(false));
  // }, []);
  //
  // if (products.length <= 0) {
  //   setErrorType(ErrorType.ItemsLengthZero);
  // }

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <main className="main page__section">
          <Routes>
            <Route path="/" element={<HomePage products={products} />} />
            <Route path="/home" element={<HomePage products={products} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
