import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './Components/HomePage/HomePage';
import { PhonesPage } from './Components/PhonesPage/PhonesPage';
import { HashRouter as Router } from 'react-router-dom';

export const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="default" element={<h1>Product Catalog</h1>} />
        <Route path="/phones" element={<PhonesPage />} />
      </Routes>
    </Router>
  </div>
);
