import './App.scss';
import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Asseccories } from './pages/Accessories';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';

const App: React.FC = () => (
  <div className="App">
    <NavBar />

    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/tablets" element={<Tablets />} />
        <Route path="/accessories" element={<Asseccories />} />
      </Routes>
    </div>

    <Footer />
  </div>
);

export default App;
