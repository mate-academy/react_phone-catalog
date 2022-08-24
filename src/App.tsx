// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { NavBar } from './pages/NavBar/NavBar';
import { Home } from './pages/Home/Home';
import { Phones } from './pages/Phones/Phones';
import { Tablets } from './pages/Tablets/Tablets';
import { Accessories } from './pages/Accessories/Accessories';

const App = () => (
  <Routes>
    <Route path="/" element={<NavBar />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/phones" element={<Phones />} />
      <Route path="/tablets" element={<Tablets />} />
      <Route path="/accessories" element={<Accessories />} />
    </Route>
  </Routes>
);

export default App;
