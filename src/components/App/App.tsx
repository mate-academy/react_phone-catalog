import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from '../../Routes/HomePage/HomePage';
import { Footer } from '../Footer/Footer';
import { PhonesPage } from '../../Routes/PhonesPage/PhonesPage';
import { TabletsPage } from '../../Routes/TabletsPage/TabletsPage';
import { AccessoriesPage } from '../../Routes/AccessoriesPage/AccessoriesPage';

const App = () => {
  return (
    <div className="app">
      <Navigate to="home" replace />
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
