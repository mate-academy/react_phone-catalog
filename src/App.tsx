import './App.scss';
import { Header } from './components/Header/header';
import { HomePage } from './pages/HomePages';
import { Footer } from './components/footer/footer';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PhonesPage } from './pages/PhonesPage';

export const App = () => (
  <Router>
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          {/* <Route path="/tablets" element={<TabletsPage />} /> */}
          {/* <Route path="/accessories" element={<AccessoriesPage />} /> */}
        </Routes>
        <Footer />
      </div>
    </div>
  </Router>
);
