import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletPage } from './pages/TabletPage';
import { Accessories } from './pages/Accessories';

export const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/phones" element={<PhonesPage />} />
      <Route path="/tablets" element={<TabletPage />} />
      <Route path="/accessories" element={<Accessories />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
