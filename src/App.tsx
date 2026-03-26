import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
// import useFetch from './hooks/useFetch';

import './App.scss';
import { HomePage } from './pages/HomePage';
import { PhonePage } from './pages/PhonePage';

export const App = () => {
  // const { data: phones, loading, error, reload } = useFetch('/api/phones.json');

  return (
    <div className="App">
      <div className="app-wrapper">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonePage />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
        {/* <h1>Product Catalog</h1> */}

        <Footer />
      </div>
    </div>
  );
};
