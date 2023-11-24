import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/header/NavBar';
import { HomePage } from './pages/HomePage';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';

const App = () => (
  <div className="App">
    <Router>
      <NavBar />
      <main className="main">
        <div className="main__container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<Phones />} />
            <Route path="/tablets" element={<Tablets />} />
            <Route path="/accessories" element={<Accessories />} />
          </Routes>
        </div>
      </main>
    </Router>
  </div>
);

export default App;
