import { Route, Routes } from 'react-router-dom';
import './App.scss';
import './utils/_reset.scss';
import { HomePage } from './pages/HomePage/HomePage';
import { Header } from './components/Header';

export const App = () => (
  <>
    <Header />

    <Routes>
      <Route path="/" index element={<HomePage />} />
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  </>
);
