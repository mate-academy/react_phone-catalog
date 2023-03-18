import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/header';
import { Home } from './pages/home/Home';
import { ProductCatalog } from './pages/productCatalog/ProductCatalog';

const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<ProductCatalog />}>
        <Route path="phones" element={<ProductCatalog />} />
        <Route path="tablets" element={<ProductCatalog />} />
        <Route path="accessories" element={<ProductCatalog />} />
      </Route>
    </Routes>
  </div>
);

export default App;
