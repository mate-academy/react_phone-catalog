import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletPage } from './pages/TabletPage/TabletPage';
import { AccessoriesPage } from './pages/AccessoriesPage/Accessories';

export const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/phones" element={<PhonesPage />} />
      <Route path="/tablets" element={<TabletPage />} />
      <Route path="/accessories" element={<AccessoriesPage />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
