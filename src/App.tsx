import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Menu } from './components/Menu/Menu';
import { Home } from './modules/Home';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Item } from './modules/Items';

export const App = () => {
  const pageContainer = (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={pageContainer}>
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/phones" element={<p>phones page</p>} />
          <Route path="/*" element={<h1>Page not found</h1>} />
          <Route path="/phones/" element={<Item />} />
        </Route>
      </Routes>
    </div>
  );
};
