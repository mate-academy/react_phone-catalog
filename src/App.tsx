import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Phones from './pages/Phones';
import Tablets from './pages/Tablets';
import Accessories from './pages/Accessories';
import './App.scss';
import Footer from './components/Footer';
import './styles/vars.css';

export const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/phones" element={<Phones />} />
      <Route path="/tablets" element={<Tablets />} />
      <Route path="/accessories" element={<Accessories />} />
    </Routes>
    <Footer />
  </Router>
);
