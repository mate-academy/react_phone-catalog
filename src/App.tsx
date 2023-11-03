import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Home } from './pages/Home';
import './App.scss';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';

export const App = () => (
  <div className="App">
    <Header />
    <main className="page__main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/phones" element={<Phones />} />
        <Route path="/tablets" element={<Tablets />} />
      </Routes>
    </main>
  </div>
);
