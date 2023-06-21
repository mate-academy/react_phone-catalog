import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from '../../Routes/HomePage/HomePage';
import { Footer } from '../Footer/Footer';
import { ProductPage } from '../ProductPage/ProductPage';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/phones"
          element={<ProductPage type="phone" title="Mobile phones" />}
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
