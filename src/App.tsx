import { Navbar } from './modules/shared/components/Navbar';
import './App.scss';
import { Footer } from './modules/shared/components/Footer';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Contacts } from './modules/Contacts';
import { Rights } from './modules/Rights';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App = () => (
  <div className="App" id="top">
    <ScrollToTop />
    <Navbar />

    <main className="App__body">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/github" element={<h1>GitHub</h1>} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/rights" element={<Rights />} />
      </Routes>
    </main>

    <Footer />
  </div>
);
