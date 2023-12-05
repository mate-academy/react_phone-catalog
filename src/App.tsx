import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/Header/NavBar';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';
import { Footer } from './components/Footer';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const App = () => (
  <div className="App">
    <Router>
      <NavBar />
      <main className="main">
        <div className="main__container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route index element={<HomePage />} />
            <Route path="/phones">
              <Route index element={<PhonesPage />} />
              <Route path=":productID" element={<ProductDetailsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="/tablets" element={<Tablets />} />
            <Route path="/accessories" element={<Accessories />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  </div>
);

export default App;
