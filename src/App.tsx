import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
// import useFetch from './hooks/useFetch';

export const App = () => {
  // const { data: phones, loading, error, reload } = useFetch('/api/phones.json');

  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<h1>Product Catalog</h1>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      {/* <h1>Product Catalog</h1> */}

      <Footer />
    </div>
  );
};
