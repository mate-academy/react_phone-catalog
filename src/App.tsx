import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header/Header';

export const App = () => (
  <div className="App">
    <header>
      <Header />
    </header>
    <Routes>
      <Route path="/" index element={<HomePage />} />
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  </div>
);
