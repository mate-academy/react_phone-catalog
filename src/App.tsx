import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './Components/HomePage/HomePage';
import { PhonesPage } from './Components/PhonesPage/PhonesPage';
import { HashRouter as Router } from 'react-router-dom';
import { PhoneOffer } from './Components/PhoneOffer/PhoneOffer';

export const App = () => (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="default" element={<h1>Product Catalog</h1>} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/phones/:itemId" element={<PhoneOffer />} />
      </Routes>
    </Router>
  </div>
);
