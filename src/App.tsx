import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Aside } from './components/Aside';
import { Main } from './components/Main';
import { useState } from 'react';
import { Header } from './components/Header';
import { Product } from './components/Product';

export const App = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  return (
    <>
      <div className="App" hidden>
        <h1>Product Catalog</h1>
      </div>

      <Header setIsAsideOpen={setIsAsideOpen} />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/phones" element={<Product type="phones" />} />
        <Route path="/tablets" element={<Product type="tablets" />} />
        <Route path="/accessories" element={<Product type="accessories" />} />
      </Routes>

      {isAsideOpen && <Aside onClose={() => setIsAsideOpen(false)} />}
    </>
  );
};
