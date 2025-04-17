import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Menu } from './components/Menu/Menu';
import { Home } from './modules/Home';
import { Routes, Route, Outlet } from 'react-router-dom';

const pageContainer = (
  <div>
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={pageContainer}>
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/phones" element={<p>phones page</p>} />
        <Route path="/*" element={<h1>Page not found</h1>} />
      </Route>
    </Routes>
  </div>
);
